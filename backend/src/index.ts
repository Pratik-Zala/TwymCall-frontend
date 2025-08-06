import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import path from 'path';
import fs from 'fs';
import microsoftRoutes from './modules/microsoft-graph/microsoft.routes';
import clientRequestRoutes from './modules/client-request/client-request.routes';
import geminiRoutes from './modules/gemini/gemini.routes';
import hubspotRoutes from './modules/hubspot/hubspot.routes';

const app = express();

const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

declare module 'express-session' {
  interface SessionData {
    pkceCodes: {
      challenge: string;
      verifier: string;
    };
    accessToken: string;
    account: any;
  }
}

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
}));

const port = 3000;

// Group all API routes under /api
const apiRouter = express.Router();
apiRouter.use('/microsoft', microsoftRoutes);
apiRouter.use('/client-request', clientRequestRoutes);
apiRouter.use('/gemini', geminiRoutes);
apiRouter.use("/hubspot", hubspotRoutes);

app.use('/api', apiRouter);

// Custom fallback middleware to serve the frontend for any non-API routes.
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
    return;
  }
  next();
});

console.log('Frontend dist path:', frontendDistPath);
console.log('Does index.html exist?', fs.existsSync(path.join(frontendDistPath, 'index.html')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 