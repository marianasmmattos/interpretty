FROM node:14

ENV CPU_SHARES="256"
ENV MEMORY="2g"

WORKDIR .

COPY . .

RUN npm install

CMD ["node", "main.js"]
