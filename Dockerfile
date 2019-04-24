FROM node:latest
LABEL authors="kpuri@vt.edu, mning@vt.edu"
WORKDIR /app
COPY . .
RUN npm install
HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
      CMD curl -sS http://localhost:3000/api/health || exit 1
CMD node app.js

