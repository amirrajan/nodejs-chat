## NodeJS Chat (MIT License)

A node js chat app using web sockets (socket.io)

## Run Locally

Install all the dependencies:

    npm install (you may need to prefix this with sudo if you're on Mac)

Run the app:

    node start.js

Consider using the package `nodemon` if you'd like. It'll auto start your server
every time you save.

    npm install nodemon -g
    nodemon start.js

Then navigate to `http://localhost:3000`

Start up two browsers and start role playing. Keep it PG 13 though.

## Signing up, and deploying to Heroku

### Documentation

From heroku.com, click Documentation, then click the Getting Started
button, then click Node.js from the list of options on the
left...which will take you here:
https://devcenter.heroku.com/articles/nodejs

Install Heroku toolbelt from here: https://toolbelt.heroku.com/

Sign up via the website (no credit card required).

Login using the command line tool:

    heroku login

Create your heroku app:

    heroku create

Git deploy your app:

    git push heroku master

Open the app (same as opening it in the browser):

    heroku open

And your app should be up on Heroku.
