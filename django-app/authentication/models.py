from django.contrib.auth.models import AbstractUser
from django.db import models

import os

class User(AbstractUser):
    # username=None
    email = models.EmailField(unique=True)

    image = models.ImageField(default="images/user-default-image.png",upload_to="images",blank=True,null=True)
    resetToken = models.CharField(max_length=1000,blank=True,null=True)
    resetTokenExpiration = models.CharField(max_length=1000,blank=True,null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def full_name(self):
        return self.first_name+" "+ self.last_name

    def __str__(self):
        return self.full_name()
    
    def delete(self, *args, **kwargs):
        # Delete the image file from the filesystem if it exists and is not the default image
        if self.image and os.path.isfile(self.image.path) and self.image.name != "images/user-default-image.png":
            os.remove(self.image.path)
        
        super(User, self).delete(*args, **kwargs)
    
    # def delete(self, *args, **kwargs):
    #     # Delete the image file from the filesystem if it exists
    #     # if self.image:
    #     #     if os.path.isfile(self.image.path):
    #     #         os.remove(self.image.path)

    #     self.image.delete()
        
    #     super(User, self).delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        # Check if the object already exists
        try:
            this = User.objects.get(id=self.id)
            # Check if the image field has changed
            if this.image != self.image:
                if this.image and this.image.name != "images/user-default-image.png":
                    # Delete the old image from the filesystem
                    if os.path.isfile(this.image.path):
                        os.remove(this.image.path)
        except User.DoesNotExist:
            pass
        
        super(User, self).save(*args, **kwargs)
    
    # def save(self, *args, **kwargs):
    #     # Check if the object already exists
    #     try:
    #         this = User.objects.get(id=self.id)
    #         # Check if the image field has changed
    #         if this.image != self.image:
    #             if this.image:
    #                 # Delete the old image from the filesystem
    #                 if os.path.isfile(this.image.path):
    #                     os.remove(this.image.path)
    #     except User.DoesNotExist:
    #         pass
        
    #     super(User, self).save(*args, **kwargs)
    
    
    

