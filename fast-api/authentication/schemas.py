from pydantic import BaseModel
from typing import Optional

class signUpSchema(BaseModel):
    first_name: Optional[str]  # Making first_name optional
    last_name: Optional[str]   # Making last_name optional
    email:str
    password:str
    confirm_password:str
    is_staff:bool


class userListView(BaseModel):
    first_name:str
    last_name:str
    email:str
    is_staff:bool

    @classmethod
    def from_orm(cls, obj):
        return cls(**obj.__dict__) 


class signInSchema(BaseModel):
    email:str
    password:str


    

