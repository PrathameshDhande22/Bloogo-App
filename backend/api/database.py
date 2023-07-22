import datetime
from mongoengine import *


class User(Document):
    email = EmailField()
    password = StringField()
    isverified = BooleanField(default=False)
    firstname = StringField()
    lastname = StringField()
    dob = DateField()
    createdon = DateField(default=datetime.datetime.today().date())
    isgooglelogin = BooleanField(default=False)
    profileurl = URLField()
    verification = StringField()


class Tags(Document):
    name = StringField()


class Blog(Document):
    title = StringField()
    thumbnail = URLField()
    content = StringField()
    createdon = DateTimeField(default=datetime.datetime.today())
    createdby = EmailField()
    tag = StringField()
    authorid = ObjectIdField()
    name = StringField()
