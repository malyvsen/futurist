#!/bin/sh

eval "$(ssh-agent -s)"

chmod 600 ./futurist_ci
ssh-add ./futurist_ci

ssh-keyscan -H $IP_ADDR >> ~/.ssh/known_hosts

ssh $DEPLOY_USER@$IP_ADDR "bash -c 'cd /var/www/futurist && bash ./assets/deploy.sh'"