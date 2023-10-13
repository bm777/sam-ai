from flask import Flask, request, jsonify
app = Flask(__name__)
import requests
from sam_ai import get_answer

@app.route('/')
def hello_world():
    return 'basic API'


@app.route('/generate', methods=['GET'])
def generate():
    """
    Handles the /generate endpoint which generate answer based on a given query sementically.
    """
    query = request.args.get('query')
    
    row = get_answer(query)
    
    if row:
        response = {
            'answer': row[0] if row else None,
        'sources': row[1] if row else None,
        'image_url': row[2] if row else None,
        'error': None if row else 'No answer could not be generated from the user query'
        }
    else:
        response = {'error': 'No answer could not be generated from the user query'}
    
    return jsonify(response)


if __name__ == '__main__':
    app.run()
