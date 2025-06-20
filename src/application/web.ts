import express from 'express';
import { publicRouter } from '../route/public-api';
import { errorMiddleware } from '../middleware/error-middleware';
import { apiRouter } from '../route/api';
import cors from 'cors';

export const web = express()
web.use(express.json())
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow cookies
};

web.use(cors(corsOptions));
web.use(publicRouter)
web.use(apiRouter)
web.use(errorMiddleware)


// const app = express();
// Define CORS options


