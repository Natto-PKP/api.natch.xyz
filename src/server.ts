import Express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const Server = Express();

Server.use(Express.urlencoded({ extended: true })); // Parse URL-encoded bodies
Server.use(cookieParser(process.env.SIGNED_COOKIE_SECRET)); // Parse cookies
Server.use(Express.json()); // Parse JSON bodies
Server.use(cors()); // Allow all origins

// Server.use(VersionRouter);
