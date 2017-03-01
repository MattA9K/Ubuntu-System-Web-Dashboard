#!/bin/bash
echo "Ubuntu System Dashboard"
echo "Developed by Matt Andrzejczuk"
echo "Welcome, $USER. Installing Python 3 now."
sudo apt-get install -y python3-pip
sudo apt-get install build-essential libssl-dev libffi-dev python-dev
sudo apt-get install -y python3-venv

sudo pip3 install django-rest
sudo pip3 install --upgrade pip

echo "Installing Django."
sudo pip3 install django
echo "Installing Django-REST."
sudo pip3 install django-rest
sudo pip3 install djangorestframework
echo "Installing DRF Docs."
sudo pip3 install drfdocs
sudo pip3 install django-oauth-toolkit
sudo pip3 install Pillow
sudo pip3 install django-debug-toolbar


echo "Installing UWSGI."
sudo pip3 install uwsgi


echo "Installing Python 3 libraries."
sudo apt-get install -y software-properties-common python3-software-propertie
sudo add-apt-repository -y ppa:nginx/stable
sudo apt-get install -y sqlite3

