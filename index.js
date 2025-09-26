const express = require('express');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/api/users/user.routes');

const app = express();
const port = 3001;

connectDB();

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});