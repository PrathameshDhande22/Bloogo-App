import os
from typing import Any
from fastapi import UploadFile
import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from random import randbytes
import hashlib
import cloudinary
import cloudinary.uploader
import cloudinary.api


secret_key = os.getenv("SECRET")
pwd = CryptContext(schemes="bcrypt")


def get_access_token(email: str) -> str:
    """Create the access token using user email and expiry date of 2 days

    :param email: Email String
    :type email: str
    :return: JWT Access Token
    :rtype: str
    """
    expiry_date = str(datetime.today().date() + timedelta(days=2))
    encoded = jwt.encode(
        payload={"email": email, "expiry": expiry_date},
        key=str(secret_key),
        algorithm="HS256",
    )
    return encoded


def hashed_password(password: str) -> str:
    """Creates the Hashed password for the given password using passlib module.

    :param password: Password to be hashed
    :type password: str
    :return: Hashed password
    :rtype: str
    """
    return pwd.hash(password, scheme="bcrypt")


def verify_password(password: str, hash_pw: str) -> bool:
    """Verifies the password with hashed password using passlib module.

    :param password: Password to be compared with hashed Password
    :type password: str
    :param hash_pw: hashed Password to compare with password
    :type hash_pw: str
    :return: True if password and hash_pw are same else False.
    :rtype: bool
    """
    return pwd.verify(password, hash_pw, scheme="bcrypt")


def decode_jwt(token: str) -> dict:
    """Decodes the Given JWT (Json Web Token) to payload dict.

    :param token: jwt encoded token
    :type token: str
    :return: decoded payload data in form of dictionary.
    :rtype: dict
    """
    decoded = jwt.decode(token, key=str(secret_key), algorithms=["HS256"])
    return decoded


def check_Expiry(date: str) -> bool:
    """Return True if the given date is not expiring from current Date.

    :param date: Date String
    :type date: str
    :return: True if date is not Expiring
    :rtype: bool
    """
    date = datetime.fromisoformat(date)
    current_date = datetime.today()
    if current_date > date:
        return False
    return True


def getHash() -> str:
    """Generates the Random Hash used for verification

    :return: some random Hash to verify the email
    :rtype: str
    """
    token = randbytes(10)
    hashedCode = hashlib.sha256(token).hexdigest()
    return hashedCode


def checkNone(first: Any, second: Any) -> Any:
    """Checks whether which field is None

    :param first: Any Datatype to Check if its None.
    :type first: Any
    :param second: Any Datatype to Check if it is None.
    :type second: Any
    :return: Return the parameter which is Not None.
    :rtype: Any
    """
    if first is None:
        return second
    return first


async def upload_image(file: UploadFile) -> str:
    """Uploades the file to the Cloudinary Server.

    Args:
        file (UploadFile): The file uploaded to the api endpoint.

    Returns:
        str: public_id of the uploaded file in the cloudinary.
    """
    resp = cloudinary.uploader.upload(file.file)
    return resp["public_id"]


def deleteImage(public_id: str):
    """Deletes the image from the cloudinary server.

    Args:
        public_id (str): of the image to be deleted.
    """
    try:
        cloudinary.uploader.destroy(public_id)
    except Exception as e:
        print("Exception in deleteimage ", e)


def deleteImages(public_id: list[str]):
    """Delete all images from the cloudinary server.

    Args:
        public_id (list[str]): list of public ids to delete images.
    """
    try:
        cloudinary.api.delete_resources(public_id, all=True)
    except Exception as e:
        print(e)
