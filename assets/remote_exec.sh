#!/bin/sh
echo $SSH_KEY > /tmp/ssh_key
ssh -i /tmp/ssh_key $DEPLOY_USER@$IP_ADDR 'bash -s' < scripts/deploy.sh