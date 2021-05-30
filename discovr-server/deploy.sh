#!/bin/bash

echo What should the version be ?
read VERSION

docker build -t quentinbrohan/discovr:$VERSION .
docker push quentinbrohan/discovr:$VERSION
ssh -i "~/.ssh/aws-ec2-qb.pem" "ubuntu@ec2-54-234-61-225.compute-1.amazonaws.com" "docker pull quentinbrohan/discovr:$VERSION && docker tag quentinbrohan/discovr:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
