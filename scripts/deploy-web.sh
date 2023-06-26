#!/usr/bin/env bash

S3_BUCKET="s3://kiosk-team5/deploy/web"
PROJECT_ROOT="/home/ubuntu/web"
TEMP_DIRECTORY="${PROJECT_ROOT}/temp"
NGINX_ROOT="/var/www/html"
BUILD_FILE="react-build.zip"

sudo rm -rf ${NGINX_ROOT}/*
mkdir -p ${PROJECT_ROOT}
aws s3 cp ${S3_BUCKET}/${BUILD_FILE} ${PROJECT_ROOT}/
sudo unzip ${PROJECT_ROOT}/${BUILD_FILE} -d ${TEMP_DIRECTORY}
sudo cp -r ${TEMP_DIRECTORY}/deploy/* ${NGINX_ROOT}/
rm -rf ${TEMP_DIRECTORY}
rm ${PROJECT_ROOT}/${BUILD_FILE}

sudo service nginx restart
