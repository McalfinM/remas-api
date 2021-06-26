# FROM node:15.4.0-alpine3.10

# # update packages
# RUN apk update

# # create root application folder
# WORKDIR /src/app

# # set environtment values
# ENV PORT=3000
# ENV GCLOUD_STORAGE_BUCKET=intotu-dev
# ENV MONGO_URI=mongodb+srv://devtitippaket:fHhUSoxEMwZdY3tB@devtitippaket.73otm.mongodb.net/devtitippaket-vehicles
# ENV JWT_SECRET=secret
# ENV KAFKA_BROKERS=kafka-clusterip-srv:9094
# ENV KAFKA_GROUP_ID=titip_paket_vehicle_service_consumer_group
# ENV REDIS_HOST=redis-srv
# ENV REDIS_PORT=6379
# ENV API_BASE_URL=https://api.dev.titippaket.winfad.com
# ENV API_MITRA_URL=https://api.dev.titippaket.winfad.com/logistic-partners

# # copy over configs to root application folder
# COPY package.json yarn.lock* ./
# COPY tsconfig.json ./

# RUN yarn install

# # copy over all remaining source code to root application folder
# COPY ./ ./

# # check files list
# RUN ls -a

# RUN yarn tsc
# EXPOSE 3000

# CMD [ "node", "./dist/app.js" ]
