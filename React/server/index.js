import express from "express";
import bodyParser from "body-parser"
import cors from 'cors';

//import userRoutes from './routes/user.js'
import entriesRoutes from './routes/entries.js'
import projectsRoutes from './routes/projects.js'

const app = express();
const PORT = 5000;


app.use(cors()) 
app.use(express.json());
app.use(bodyParser.json());

//app.use('/user', userRoutes);
app.use('/entries', entriesRoutes);
app.use('/projects', projectsRoutes);


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

app.get('/', (req, res) => res.send('Hello from Homepage'));

