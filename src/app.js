import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SÄTT EJS SOM VY-MOTOR
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(fileUpload());

import analyzerRouter from './routes/analyzer.js';
import formatterRouter from './routes/formatter.js';
import transformerRouter from './routes/transformer.js';
import searcherRouter from './routes/searcher.js';
import reverserRouter from './routes/reverser.js';
import wordOptimizerRouter from './routes/wordOptimizer.js';
import textGamingRouter from './routes/textGaming.js';
import textForensicsRouter from './routes/textForensics.js';
import moodEngineRouter from './routes/moodEngine.js';
import uploadRouter from './routes/upload.js';

app.use('/analyzer', analyzerRouter);
app.use('/formatter', formatterRouter);
app.use('/transformer', transformerRouter);
app.use('/searcher', searcherRouter);
app.use('/reverser', reverserRouter);
app.use('/wordoptimizer', wordOptimizerRouter);
app.use('/textgaming', textGamingRouter);
app.use('/textforensics', textForensicsRouter);
app.use('/moodengine', moodEngineRouter);
app.use('/upload', uploadRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});
