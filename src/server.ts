import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routers from './routers';

dotenv.config();

const server = Express();

server.use(Express.urlencoded({ extended: true }));
server.use(Express.json());
server.use(cors());

server.use(routers);

export default server;
