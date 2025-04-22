from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

# Replace with your project-specific API key
OPENAI_API_KEY = "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"

@app.route('/api/ask', methods=['POST'])
def ask():
    data = request.json
    user_input = data.get('question', '')

    try:
        # Make a POST request to OpenAI's API
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-3.5",  # Use "gpt-3.5-turbo" if you don't have access to GPT-4
                "messages": [
                    {"role": "system", "content": "You are a helpful financial assistant."},
                    {"role": "user", "content": user_input}
                ],
                "max_tokens": 150
            }
        )

        # Parse the response
        if response.status_code == 200:
            answer = response.json()["choices"][0]["message"]["content"].strip()
            return jsonify({"answer": answer})
        else:
            # Handle errors from OpenAI's API
            return jsonify({"error": response.json()}), response.status_code

    except Exception as e:
        print(f"Error: {e}")  # Log the error to the terminal
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)