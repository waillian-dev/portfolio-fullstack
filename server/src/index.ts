import app from './app';
import { connectDB } from './config/db';
import { ENV } from './config/env';

const startServer = async () => {
  await connectDB();

  const PORT = ENV.PORT;
  app.listen(PORT, () => {
    console.log(`[Server] Portfolio API Server running on port ${PORT} in ${ENV.NODE_ENV} mode`);
  });
};

startServer();
