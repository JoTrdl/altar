# DOCKER-VERSION 1.3.0
FROM    centos:centos7

# Enable EPEL for Node.js
RUN     rpm -Uvh http://fedora-epel.mirror.iweb.com/7/x86_64/e/epel-release-7-2.noarch.rpm
# Install Node.js and npm
RUN     yum install -y nodejs
RUN     yum install -y npm

# Bundle app source
COPY . /bundle
# Install app dependencies
RUN cd /bundle; npm install -d

EXPOSE  8080
CMD ["node", "/bundle/app/app.js"]