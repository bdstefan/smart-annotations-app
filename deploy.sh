#!/bin/bash

docker-compose down
docker-compose up -d --build

sudo chown -R www-data:www-data mongo-data