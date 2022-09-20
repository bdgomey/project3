FROM node:current-alpine3.15

RUN apk update && \
apk add git && \

mkdir -p /usr/src/api 
WORKDIR /usr/src/api
RUN git clone https://github.com/bdgomey/project3.git && \
cd project3/flightServiceFrontend && \
npm install
#COPY test.js /usr/src/api
ENV LISTEN_PORT=3000

EXPOSE 3000/tcp
WORKDIR /usr/src/api/project3/flightServiceFrontend
ENTRYPOINT ["npm"]
CMD ["start"]
# CMD ["node", "./project3/flightServiceBackend/index.js"]
# ENTRYPOINT ["node"]
# CMD ["./test.js"]



