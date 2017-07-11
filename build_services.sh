#!/bin/bash

echo "Remember to docker login"

docker build -f Dockerfile_service_a . --tag aaronmartins/service_a:latest
docker build -f Dockerfile_service_b . --tag aaronmartins/service_b:latest

# Do this once, beforehand:
# docker login

docker push aaronmartins/service_a:latest
docker push aaronmartins/service_b:latest
