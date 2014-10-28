####################
# Docker installation
###############################################################
# docker build -t stack/altar .
# docker run --name altar -d stack/altar
# docker run -p 8080:8080 -d stack/altar

####################
# Clear containers
###############################################################
# docker ps -a -q --filter "status=exited" | xargs docker rm
# docker rmi `docker images -q --filter "dangling=true"`
#############################################################################################

# http://stackoverflow.com/questions/18805073/docker-multiple-entrypoints

# DOCKER-VERSION 1.3.0
FROM    centos:centos7

# Enable EPEL
RUN     rpm -Uvh http://fedora-epel.mirror.iweb.com/7/x86_64/e/epel-release-7-2.noarch.rpm

# Install Node.js and npm
RUN     yum install -y nodejs
RUN     yum install -y npm

# Install Redis
RUN     yum install -y redis

# Bundle app source
COPY     . /bundle
# Install app dependencies
RUN     cd /bundle; npm install -d

EXPOSE  8080

# Prepare commands
RUN      echo "service redis-server start" && echo "Redis started" > /etc/bash.bashrc
RUN      echo "node /bundle/app/app.js" && echo "App started" >> /etc/bash.bashrc
ENTRYPOINT ["/bin/bash"]

#CMD ["node", "/bundle/app/app.js"]

