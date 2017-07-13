# Overview
An experiment to verify Docker network is encrypted between nodes.

**service_a** will call **service_b** over http and log the response.


# 1. Set up a Docker Swarm cluster
Add two or more physical machines to a [Docker Swarm cluster](https://docs.docker.com/engine/swarm/).

`docker swarm init`
`docker swarm join-token worker`

Note: I used Ubuntu 16.04 for the manager node, and joined the swarm with a Mac for a second node. Using the Mac as manager did not work.


# 2. Create encrypted overlay network
* Create this network on the *manager* node in your Swarm cluster. Our example network name is "the-shire".
```
docker network create \
  --driver overlay \
  --opt encrypted=true \
  the-shire
```

Or, to test an unencrypted overlay network:
```
docker network create \
  --driver overlay \
  mordor
```

# 3. Add services to Swarm cluster
To see a list of nodes in the swarm, and their hostnames:
`docker node ls`

docker deploy --compose-file docker-compose.yml test

docker service create \
  --network mordor \
  --name service_b \
  --hostname service_b \
  --publish 8090:8090 \
  --detach=false \
  aaronmartins/service_b:latest

docker service create \
  --network mordor \
  --name service_a \
  --hostname service_a \
  --detach=false \
  --publish 8089:8089 \
  --constraint 'node.hostname == moby' \
  --mount type=volume,source=logs,destination=/tmp/logs \
  aaronmartins/service_a:latest

### Constrain
Constrain each service onto a different node (physical machine) so we make sure to talk across the network.
Use `node.hostname`

#### Verify
Verify which node each service is running on:
`docker service ls`
`docker service ps service_a`
`docker service ps service_b`
When you do a "docker service ps {service name}" it should spit out a tabulated list, with the node field being the 4th column.


Created a droplet on Digital Ocean. Opened everything with their admin-console firewall.
Opened ports for ufw:
https://www.digitalocean.com/community/tutorials/how-to-configure-the-linux-firewall-for-docker-swarm-on-ubuntu-16-04


# 4. Regard Network Traffic
Regard network traffic between the two physical machines using Wireshark or tcpdump.
* We expect encrypted traffic between the two nodes!
* Try creating the overlay network **without** `--opt encrypted` and see if it changes anything.


## Building images
Dockerfiles are included for building service_a and service_b.
`npm install`
`./build_services.sh`
