import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

def review_plan(plan,question):
    response = client.chat.completions.create(\
         model="llama-3.3-70b-versatile",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": "You are a startup COO advisor."
            },
            {
                "role": "user",
                "content": f"""
                PLAN:
                {json.dumps(plan)}

                QUESTION:
                {question}
                """
            }
        ]
        )
    
    return response.choices[0].message.content
