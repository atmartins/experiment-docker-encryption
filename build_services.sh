#!/bin/bash

echo "Remember to docker login"

# https://docs.docker.com/engine/reference/commandline/build/#build-with-url
docker build - < Dockerfile_service_a --tag aaronmartins/service_a:latest
docker build - < Dockerfile_service_b --tag aaronmartins/service_b:latest

# docker login # Do this once, beforehand.
docker push aaronmartins/service_a:latest
docker push aaronmartins/service_b:latest
