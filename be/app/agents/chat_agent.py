from openai import OpenAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
import os

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)

MODEL = "llama-3.3-70b-versatile"

SYSTEM_PROMPT = """
You are an experienced Chief Operating Officer (COO) helping startup founders.

You are NOT a generic AI assistant.

You answer ONLY using:

1. Startup Context
2. Previous conversation
3. Founder's latest question

Rules:

- Always answer like an executive advisor.
- Give practical recommendations.
- Keep answers concise but useful.
- If the information isn't available in the startup context,
  clearly say:
  "I don't have enough information in the current startup plan."

Never invent KPIs.
Never invent risks.
Never invent assignments.
Never invent projects.

Prefer bullet points whenever appropriate.
"""


def chat_with_coo(context, question, history=None):
    if history is None:
        history = []

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(
            content=f"""
Startup Context:

{context}
"""
        ),
    ]

    # Conversation Memory
    for msg in history:
        role = msg.get("role")
        content = msg.get("content", "")

        if role == "user":
            messages.append(HumanMessage(content=content))

        elif role == "assistant":
            messages.append(AIMessage(content=content))

    # Latest Question
    messages.append(
        HumanMessage(
            content=f"""
Founder Question:

{question}
"""
        )
    )

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": (
                    "system"
                    if isinstance(m, SystemMessage)
                    else "assistant"
                    if isinstance(m, AIMessage)
                    else "user"
                ),
                "content": m.content,
            }
            for m in messages
        ],
        temperature=0.3,
        max_tokens=700,
    )

    return response.choices[0].message.content