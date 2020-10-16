import express from 'express';
import "reflect-metadata";
import * as dotenv from 'dotenv';
dotenv.config();

import { User } from './entity/user.entity';

import * as AWS from 'aws-sdk';
AWS.config.update({ region: process.env.REGION });

import { createConnection } from "typeorm";
let connection;

const app = express();
const port = 5000;


const data = require('data-api-client')({
  secretArn: process.env.SECRET_ARN,
  resourceArn: process.env.RESOURCE_ARN,
  database: process.env.MYSQL_DB,
  options: {
    endpoint: process.env.ENDPOINT_URL
  }
})

app.get('/', async (req, res) => {
  let user = new User();
  user.email = 'abcdefxx@gmail.com';
  user.password = 'testex';
  user.username = 'safopax';

  const postRepository = connection.getRepository(User)
  await postRepository.save(user);

  let result = await data.query(`SELECT * FROM user`)
  console.log("result", result);

  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, async () => {
  connection = await createConnection({
    type: "aurora-data-api-pg",
    database: "test",
    secretArn: 'arn:aws:secretsmanager:us-east-1:123456789012:secret:dummy',
    resourceArn: 'arn:aws:rds:us-east-1:123456789012:cluster:dummy',
    region: 'local',
    serviceConfigOptions: {
      endpoint: process.env.ENDPOINT_URL
    },
    entities: [
      __dirname + '/entity/*.js'
    ],
  });

  console.log(`Server is listening on ${port}`);
});
