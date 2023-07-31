# Bloogo APP

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=blue&color=black)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

A Blog App for all Coders, Programmers, and other.

A Bloogo will be made using react js as frontend and FastAPI as backend, and Storing data in a MongoDB ulimately also known as FARM Stack APP.

**Under Development**

![under](https://media.giphy.com/media/EIiJp9cQ3GeEU/giphy.gif)

## Used Technologies and Products :

1. [Brevo](https://developers.brevo.com/) SMTP Mail Sender for verification of Email implemented in API.
2. [logo.com](https://app.logo.com/) for Creating the Bloogo logo.
3. [write.as](https://write.as/) Reference for creating the blog. Using The above website design.
4. [Footer Design](https://preview.colorlib.com/theme/bft/bootstrap-footer-17/#) Footer Design has been taken from the above website.
5. [Moment.js](https://momentjs.com/) Used for Formatting the Date recieved From backend.
6. [Html Parser](https://github.com/remarkablemark/html-react-parser) for converting the HTML string to JSX HTML.
7. [Animate.css](https://animate.style/) for Animating some components.
8. [Formik](https://formik.org/) used for handling client side validation of form data.
9. [yup](https://github.com/jquense/yup) used for creating the form schema that can be used with formik.
10. [Material UI](https://mui.com/) Great UI Components for react, creating the readymade and coding free components.
11. [React Icons](https://react-icons.github.io/react-icons/) Icons for using in various pages to make user Interaction more attractive.

## Timeline

- **Day 1 - 17 July 2023**

  - Project Intialize. 🗒️

- **Day 2 - 18 July 2023**

  - Gathering Information on how to integrate google login and selecting the correct database. 🔎
  - Started working on Backend installed various library. 💻

- **Day 3 - 19 July 2023**

  - Started creating the api
  - Created the Folder and Managing various file 📂

- **Day 4 - 20 July 2023**

  - Implemented Database and Models 📅
  - Login,Register and Authorization Code ✅
  - Email Verification Code 📧

- **Day 5 - 21 July 2023**

  - Completed Backend for Blog endpoint 💻
  - Completed Backend for Tags endpoint 💻
  - Completed Backend for Profile Endpoint 💻

- **Day 6 - 22 July 2023**

  - Implemented full backend only google login is remaining in it. ⌨️
  - Documented the api backend. 📄
  - Frontend Initialized. 🌐

- **Day 7 - 23 July 2023**

  - Initialized the tailwindcss. <img src="https://cdn.cdnlogo.com/logos/t/58/tailwind-css.svg" height=10>
  - Server Side rendering to be done.

- **Day 8 - 24 July 2023**

  - Created the logo, Favicon for our website.

- **Day 9 - 27 July 2023**

  - Implemented Header and Home Page or Landing Page.
  - Implemented Footer.

- **Day 10 - 28 July 2023**

  - Implemented About and Developer Page and modified some CSS constraints in Header and Footer.
  - Applied the CORS Middleware to the Backend for successful communication with the frontend.
  - Implemented Full Page Blog.

- **Day 11 - 29 July 2023**

  - Implemented the Login and signup page and integrated backend.
  - Improved some Authentication in Frontend.

- **Day 12 - 30 July 2023**

  - Implemented Logout,Profile and Email Verification Pages.
  - Implemented Protected Routes.
  - Created Account on Cloudinary for image uploading and image resizing.
  - Implemented Error Page 404 Not Found Page.

- **Day 13 - 31 July 2023**
  - Modified Update Endpoint of Backend.
  - Added verify token without needing the token in Backend.
  - Get Author profile with author related Blogs added in Backend.

## Guide :

**Guide For running the project locally in your system.**

##### Running the Backend :

1. Clone the Repository

```
git clone https://github.com/PrathameshDhande22/Bloogo-App.git
```

2. Make Sure You have `python` installed in your system with `version => 3.10.3`
3. Create Virtual Environment

```
pip install virtualenv

virtualenv venv
```

4. Activate Virtal Environment

```
venv/Scripts/activate
```

if any error comes google the error it will Solved.

5. Install dependencies

```
pip install -r requirements.txt
```

6. Create `.env` file

```
MONGODB_URI=Your Mongodb URI
SECRET=Jwt secret
SMTP_API=Brevo smtp api key
```

7. Run

```
python  run.py
```

😃😃 Backend is Running Successfully in your System.

## Author : Prathamesh Dhande
