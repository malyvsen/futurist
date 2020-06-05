#!/bin/bash

cd /var/www/futurist;
git pull origin master;

cd frontend;
yarn && yarn run build;

cd ../backend;
source venv/bin/activate;
pip3 install -r requirements.txt;

systemctl restart futurist-flask;