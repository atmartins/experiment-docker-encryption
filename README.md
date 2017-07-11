# Overview
An experiment to verify Docker network is encrypted between nodes.

**service_a** will call **service_b** over http and log the response.


# 1. Set up a Docker Swarm cluster
Add two or more physical machines to a [Docker Swarm cluster](https://docs.docker.com/engine/swarm/).

Note: I used Ubuntu 16.04 for the manager node, and joined the swarm with a Mac for a second node. Using the Mac as manager did not work.


# 2. Create encrypted overlay network
* Create this network on the *manager* node in your Swarm cluster. Our example network name is "the-shire".
```
docker network create \
  --driver overlay \
  --opt encrypted=true \
  the-shire
```
docker network create \
  --driver overlay \
  mordor

# 3. Add services to Swarm cluster
[Add services to the swarm using the included docker-compose file](https://docs.docker.com/compose/swarm/).
or
```
docker service create \
  --network the-shire \
  --hostname service_a \
  --name service_a \
  --no-healthcheck=true \
  --restart-condition="none" \
  -v ${PWD}/logs:/tmp/logs
  aaronmartins/service_a
```

`docker service create --network the-shire --hostname service_b aaronmartins/service_b`

The included docker-compose file declares each service to use our encrypted overlay network "the-shire".

See docker-compose.yml comments for more info.

If you need to update either service, see the "Building images" section, below.


# 4. Regard Network Traffic
Regard network traffic between the two physical machines using Wireshark or tcpdump.
* We expect encrypted traffic between the two nodes!
* Try creating the overlay network **without** `--opt encrypted` and see if it changes anything.


## Building images
`npm install`
`./build_services.sh`
