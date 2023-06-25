#!/usr/bin/env bash

# 업데이트 및 필요 패키지 설치
sudo apt-get update
sudo apt-get install -y curl gnupg build-essential

# Node.js 설치
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Nginx 설치
sudo apt-get install -y nginx

# 프로젝트 디렉토리로 이동
cd /var/www/app

# npm 패키지 설치
npm install


