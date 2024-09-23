#!/bin/bash

# Check if the MongoDB container is running
if [ "$(docker ps -q -f name=mongodb)" ]; then
    echo "MongoDB container is already running."
else
    # Check if the container exists
    if [ "$(docker ps -aq -f name=mongodb)" ]; then
        echo "Starting existing MongoDB container..."
        docker start mongodb
    else
        echo "Creating and starting a new MongoDB container..."
        docker-compose up -d
    fi
fi
