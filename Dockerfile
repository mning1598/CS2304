FROM node:latest
LABEL authors="kpuri@vt.edu, mning@vt.edu"
WORKDIR /app
COPY . .
RUN npm install
CMD nodemon app.js

