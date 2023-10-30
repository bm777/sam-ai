from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from sam_ai import sam_chat #get_answer
import vertexai
from vertexai.language_models import TextGenerationModel


app = Flask(__name__)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})



@app.route('/')
def hello_world():
    return 'basic API'


@app.route('/generate', methods=['POST', "GET"])
def generate():
    """
    Handles the /generate endpoint which generate answer based on a given query sementically.
    """
    query = request.args.get('query')
    
    row , image_url= sam_chat(query)
    print(row)
    if row:
        response = {
            'answer': row if row else None,
            'image_url': image_url if image_url else None,
            'error': None if row else 'No answer could not be generated from the user query'
        }
    else:
        response = {'error': 'No answer could not be generated from the user query'}
    
    return response


if __name__ == '__main__':
    app.run()
