import datetime
from mongoengine import *


class User(Document):
    email = EmailField()
    password = StringField()
    isverified = BooleanField(default=False)
    firstname = StringField()
    lastname = StringField()
    dob = DateField()
    createdon = DateField(default=datetime.datetime.now().date())
    isgooglelogin = BooleanField(default=False)
    profileurl = StringField()
    verification = StringField()


class Tags(Document):
    name = StringField()


class Blog(Document):
    title = StringField()
    thumbnail = StringField()
    content = StringField()
    createdon = DateTimeField()
    createdby = EmailField()
    tag = StringField()
    authorid = ObjectIdField()
    name = StringField()
