from passlib.context import CryptContext
pwd_cxt = CryptContext(schemes=['bcrypt'],deprecated="auto")


class HashPassword():
    def make_password(password):
        return pwd_cxt.hash(password)
    
    def verify(plain_password,hash_password):
        return pwd_cxt.verify(plain_password,hash_password)
    