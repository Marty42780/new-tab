FROM node:slim

# copy project
COPY backend/ /usr/src/app/

# set work directory
WORKDIR /usr/src/app/
RUN chmod +x /usr/src/app/init.sh

# install dependencies
RUN npm install

# run the project
EXPOSE 8080
ENTRYPOINT ./init.sh