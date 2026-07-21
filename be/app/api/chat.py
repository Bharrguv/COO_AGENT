from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
from app.agents.chat_agent import chat_with_coo

router = APIRouter()


class ChatRequest(BaseModel):
    context: str
    question: str
    history: List[Dict] = []


@router.post("/chat")
def chat(request: ChatRequest):
    answer = chat_with_coo(
        request.context,
        request.question,
        request.history,
    )

    return {
        "answer": answer,
    }