from pydantic import BaseModel
from typing import List

class AnswerItem(BaseModel):
    question_id: int
    option_id: int

class SubmitRequest(BaseModel):
    answers: List[AnswerItem]
