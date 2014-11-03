####################
# Docker installation
# http://viget.com/extend/how-to-use-docker-on-os-x-the-missing-guide
# options :ro
###############################################################
# docker build -t altar/stack .
# docker run --name altar -d altar/stack
# docker run -p 8080:8080 -d -v .:/bundle altar/stack

####################
# Clear containers
###############################################################
# docker ps -a -q --filter "status=exited" | xargs docker rm
# docker rmi `docker images -q --filter "dangling=true"`
#############################################################################################

# http://stackoverflow.com/questions/18805073/docker-multiple-entrypoints

FROM    debian:latest

# Install node, redis, nginx
RUN     export DEBIAN_FRONTEND=noninteractive && \
        apt-get update > /dev/null; apt-get install -y wget tar daemontools nginx > /dev/null && \
        wget -q http://nodejs.org/dist/v0.10.33/node-v0.10.33-linux-x64.tar.gz > /dev/null && \
        tar --strip-components 1 -xzf node-v* -C /usr/local > /dev/null && \
        apt-get clean > /dev/null; apt-get autoremove > /dev/null && \
        rm -rf node-v0.10.33-linux-x64.tar.gz /var/lib/apt/lists/* && \
        node --version && \
        mkdir /bundle; cd /bundle

EXPOSE  8080

CMD     ["node", "/bundle/app/app.js"]