from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import Annotated
from fastapi import Depends
from sqlalchemy.orm import Session


SQLALCHEMY_DATABASE_URL = "sqlite:///./fast-api.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL,connect_args={"check_same_thread":False})


SessionLocal = sessionmaker(bind=engine,autocommit=False,autoflush=False,)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session,Depends(get_db)]