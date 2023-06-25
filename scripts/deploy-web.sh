#!/usr/bin/env bash

S3_BUCKET="s3://kiosk-team5-web/deploy/web"
PROJECT_ROOT="/home/ubuntu/web"
BUILD_FILE="react-build.zip"

mkdir -p ${PROJECT_ROOT}
aws s3 cp ${S3_BUCKET}/${BUILD_FILE} .
unzip react-build.zip -d ${PROJECT_ROOT}
rm react-build.zip

sudo service nginx restart
