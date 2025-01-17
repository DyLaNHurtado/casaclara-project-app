import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('CasaClara API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});