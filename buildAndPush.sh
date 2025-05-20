#!/bin/bash
docker build --platform linux/amd64 -t polyforms .
docker tag polyforms registry.oswinjerome.in/polyforms
docker push registry.oswinjerome.in/polyforms