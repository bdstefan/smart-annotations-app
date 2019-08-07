#!/bin/bash

docker-compose down

sudo chown -R $(whoami) mongo-data

docker-compose up -d --build