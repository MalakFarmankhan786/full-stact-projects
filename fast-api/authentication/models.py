from fastapi import FastAPI

from database import Base
from sqlalchemy import Column, Integer, String,Boolean

class User(Base):
    __tablename__ = "users"

    _id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String,nullable=True)
    last_name = Column(String,nullable=True)    
    email = Column(String)
    password = Column(String)
    is_staff = Column(Boolean, default=False)

