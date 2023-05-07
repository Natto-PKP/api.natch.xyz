import Express from 'express';
import cors from 'cors';
import routes from './routes';
import './database';

const server = Express();

server.use(Express.urlencoded({ extended: true }));
server.use(Express.json());
server.use(cors());

server.use(routes);

export default server;
