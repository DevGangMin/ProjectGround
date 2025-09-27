const express = require('express');
require('dotenv').config();

const connectDB = require('./src/config/db');
const userRoutes = require('./src/api/users/user.routes');
const projectRoutes = require('./src/api/projects/project.routes');

const app = express();
const port = 3001;

app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});