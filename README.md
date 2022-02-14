# Corgta

This repository is to develop Corgta web application.

## Clone the source repository and initialize the code.

1. Cloning this repository using git.
   ```bash
   git clone YOUR-BITBUCKET-URL
   ```

## Run the dev environment with Docker.

1. Run the docker image via the docker-compose.
   ```bash
   docker-compose up --build
   ```
   In the docker container, the frontend run at port: 4200 while backend run at port: 8000
   You can run frontend and backend mannually but have to configure the whitelist and other small configurations to make it work.
   Using docker here is the the easiest way to run frontend and backend together as the docker containers prepair the environments for both frontend and backend.
2. Open browser http://localhost. Need to wait for the server is ready.