from fastapi import APIRouter, HTTPException, Response, status
from fastapi.responses import JSONResponse
from database import engine,db_dependency
from . import models,schemas,token
from .models import User
from hashing import HashPassword


router = APIRouter(
    prefix="/api",
    tags=['User']
)

models.Base.metadata.create_all(engine)

@router.post("/signup",response_model=schemas.userListView)
def signup(request:schemas.signUpSchema,db:db_dependency):
    first_name = request.first_name if request.first_name else ""
    last_name = request.last_name if request.last_name else ""
    print(first_name,last_name,"DATTATTA")
    email = request.email
    password= request.password
    confirm_password = request.confirm_password
    
    user = db.query(User).filter(User.email==email).first()
    if user is not None:
        raise HTTPException(status_code=409,detail=f"User with this {email} is alredy exists!")
    
    requestData = request.dict()

    for field in requestData:
        if field == "first_name" or field == "last_name":
            continue
        else:
            if requestData[field]=="":
                raise HTTPException(status_code=422,detail=f"{'Password' if field == 'password' else ('Confirm password' if field == 'confirm_password' else field.capitalize())} field is required!")
            
            if (field == "password" or field == "confirm_password") and len(requestData[field]) < 5:
                raise HTTPException(status_code=422, detail=f"{'Password' if field == 'password' else ('Confirm password' if field == 'confirm_password' else '')} must be greater than 5")
    
    if password!=confirm_password:
        raise HTTPException(status_code=422,detail=f"Password and confirm password should be same!!")
    
    
    haspPassword = HashPassword.make_password(password)
    requestData["password"] = haspPassword
    del requestData["confirm_password"]

    new_user = User(**requestData)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Convert new_user object to dictionary
    # user_data = {
    #     "id": new_user._id,
    #     "first_name": new_user.first_name,
    #     "last_name": new_user.last_name,
    #     "email": new_user.email,
    #     "is_staff": new_user.is_staff
    # }

    response_data = {
        "status_code": 201,
        "message": "User created successfully!",
        # "user": user_data
    }

    return JSONResponse(content=response_data)



@router.post("/signin")
def signin(request:schemas.signInSchema,db:db_dependency):
    email = request.email
    password= request.password

    requestData = request.dict()

    for field in requestData:
        if requestData[field]=="":
            raise HTTPException(status_code=422,detail=f"{field.capitalize()} field is required!")
        
        if field == "password"  and len(requestData[field]) < 5:
            raise HTTPException(status_code=422, detail=f"Password must be greater than 5")
    

    user = db.query(User).filter(User.email==email).first()
    if not user:
        raise HTTPException(status_code=401,detail=f"User with this {email} not found!")
    
    
    if not HashPassword.verify(password,user.password):
        raise HTTPException(status_code=401,detail=f"Your password is incorrect!")
    
    access_token = token.create_access_token(data={"_id":user._id,"email":user.email})

    response_data={"access_token":access_token}
    return JSONResponse(content=response_data)