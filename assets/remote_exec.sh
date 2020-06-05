#!/bin/sh

mkdir -p ~/.ssh
echo $SSH_KEY > ~/.ssh/id_rsa
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
ssh-keyscan -H $IP_ADDR >> ~/.ssh/known_hosts
ssh -t $DEPLOY_USER@$IP_ADDR 'bash -s' < ./deploy.sh