# DOCKER-VERSION 1.3.0
FROM    centos:centos7

# Enable EPEL for Node.js
RUN     rpm -Uvh http://fedora-epel.mirror.iweb.com/7/x86_64/e/epel-release-7-2.noarch.rpm
# Install Node.js and npm
RUN     yum install node

# Install app dependencies
npm install

EXPOSE  8080
CMD ["node", "/app/app.js"]