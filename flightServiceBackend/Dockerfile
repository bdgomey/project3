FROM node:current-alpine3.15

RUN apk update && \
apk add git && \

mkdir -p /usr/src/api 
WORKDIR /usr/src/api
RUN git clone https://github.com/bdgomey/project3.git && \
cd project3/flightServiceBackend && \
npm install
ENV MONGO_URI=mongodb+srv://defaultuser:puzhyk-bobNox-1pursi@jpcluster.safbv8u.mongodb.net/?retryWrites=true&w=majority
ENV PORT=8085

EXPOSE 8085/tcp
WORKDIR /usr/src/api/project3/flightServiceBackend
ENTRYPOINT ["npm"]
CMD ["start"]



