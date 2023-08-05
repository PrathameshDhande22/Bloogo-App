import os
from sib_api_v3_sdk.rest import ApiException
import sib_api_v3_sdk


def send_email(token: str, email: str) -> bool:
    config = sib_api_v3_sdk.Configuration()
    config.api_key["api-key"] = os.getenv("SMTP_API")
    url = os.getenv("APP_URL")
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(config))
    subject = "Email Verification"
    html_content = f"""
    <html>
    <body>
    <img src="https://ucarecdn.com/89fbacf2-2a73-4224-9659-c28140e2f50c/-/preview/200x200/-/quality/smart/-/format/auto/" alt="bloogo logo"><br/>
    <h2>Thank You For Registering With Us.</h2>
    <p>Verify Your Email Address by using the below verification Code</p>
    <p><b>Verification Link :- </b><strong><a href="{url}/verify/{token}">Click Here</a></strong></p>
    <p>Don't Reply to This Email</p>
    </body>
    </html>
    """
    sender = {"email": "no-reply@bloogo.com"}
    to = [{"email": email}]
    smtp_mail = sib_api_v3_sdk.SendSmtpEmail(
        sender=sender, html_content=html_content, subject=subject, to=to
    )
    try:
        api_response = api_instance.send_transac_email(smtp_mail)
        return True
    except ApiException as e:
        return False
