# Generated by Django 5.0.2 on 2024-03-03 01:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_alter_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(default='images/user-default-image.png', upload_to='images'),
        ),
    ]
