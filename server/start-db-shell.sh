#!/bin/bash

# Wait for MongoDB to start
until docker exec mongodb mongo --eval "print(\"waited for connection\")"; do
    echo "Waiting for MongoDB to start..."
    sleep 2
done

# Run the MongoDB shell
docker exec -it mongodb mongo
