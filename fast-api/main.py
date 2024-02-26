from fastapi import FastAPI
from authentication.routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from specific origin
    # allow_origins=["http://localhost:3000"],  # Allow requests from specific origin
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Add the HTTP methods your frontend uses
    allow_headers=["Authorization", "Content-Type"],  # Allow specific headers
)

app.include_router(router)