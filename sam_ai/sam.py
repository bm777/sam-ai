import vertexai
from vertexai.language_models import TextGenerationModel
from qdrant_client import QdrantClient
import time

import google.auth
import google.auth.transport.requests
import requests
import vertexai
from vertexai.language_models import TextGenerationModel

PROJECT = "merantix-genai"
URL = f"https://us-central1-aiplatform.googleapis.com/v1/projects/{PROJECT}/locations/us-central1/publishers/google/models/multimodalembedding:predict"

vertexai.init(project="merantix-genai", location="us-central1")

creds, project = google.auth.default()
model = TextGenerationModel.from_pretrained("text-bison")

def get_embedding(text: str = None, image: bytes = None):
    auth_req = google.auth.transport.requests.Request()
    creds.refresh(auth_req)
    query_doc = {}
    if text is not None:
        query_doc["text"] = text
    if image is not None:
        query_doc["image"] = "image": {
            "bytesBase64Encoded": base64.b64encode(image) # include if image present. Use byte64 encoded if not in GCS.
        }
            
    body = {
        "instances": [
            query_doc
        ]
    }
    headers = {
        "Authorization": f"Bearer {creds.token}",
        "Content-Type": "application/json; charset=utf-8"
    }
    
    status_code = 500
    while status_code != 200:
        response = requests.post(URL, json=body, headers=headers)
        status_code = response.status_code
        if status_code == 200:
            #text_embedding = response.json()["predictions"][0].get("textEmbedding", [0.]*1408)
            #image_embedding = response.json()["predictions"][0].get("imageEmbedding", [0.]*1408)
            embedding = response.json()["predictions"][0].get("embedding", [0.]*2816)
            
            #print(text_embedding + image_embedding)
            print("embedding :: ", embedding)
            return embedding #text_embedding + image_embedding
        else:
            print("No response!!")
            print(response)#.json())
    
def generative_response(payload):
    parameters = {
        "max_output_tokens": 1024,
        "temperature": 1,
        "top_p": 0.8,
        "top_k": 40
    }
    
    response = model.predict(prompt=payload,**parameters)
    print(f"Response from Model: {response.text}")
    #print(response)
    return response.text


def search(query, limit):
    qdrant = QdrantClient("34.173.25.184", port=6333)
    # encoder
    query_vector = get_embedding(text=str(query), image=None)
    print(query_vector)
    #time.sleep(1000)
    hits = qdrant.search(
        collection_name="bestbuy-concat-multimodal",
        query_vector=query_vector,
        limit=1
    )
    #for hit in hits:
    print("type", type(hits))
    
    print([hit.payload for hit in hits])
        
    return [hit.payload for hit in hits]


def sam_chat(query):
    
    vertexai.init(project="merantix-genai23ber-9548", location="us-central1")
    parameters = {
        "max_output_tokens": 1024,
        "temperature": 0.2,
        "top_p": 0.8,
        "top_k": 40
    }
    
    limit=1
    
    ## call to model
    
    
    response = search(query, limit=1)
    print("orig response: ",response )
    image_url = response[0]["image"]
    source_prompt = f"""You are AI-powered e-commerce search agent that enhances the shopping experience for online users. You should be capable of understanding and responding to user queries effectively, improving search result accuracy, and providing personalized product recommendations. Consider factors like natural language understanding, user intent recognition, filter and sorting options, and dynamic updates to search results. The goal is to create a seamless and efficient shopping experience, ultimately boosting user engagement and conversions on the platform for the given description below. 
    Description: {response[0]["description"]}
    User Query : {query}
    Answer : 
    """
    response2 = generative_response(payload=str(source_prompt))
    print(response2)
    
    
    return response2 , image_url



if __name__ == "__main__":
    sam_chat("OK!")
