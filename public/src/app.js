import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// SÄTT EJS SOM VY-MOTOR
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

app.use(express.static(path.join(__dirname, '../public')))
app.use(fileUpload())

// Grundläggande hemsida
app.get('/', (req, res) => {
  res.render('index', { title: 'Text Toolkit', message: 'Välkommen till Text Toolkit!' })
})
// Routes
import uploadRouter from './routes/upload.js'
import analyzerRouter from './routes/analyzer.js'
import formatterRouter from './routes/formatter.js'
import transformerRouter from './routes/transformer.js'
import searcherRouter from './routes/searcher.js'

// Register routes
app.use('/upload', uploadRouter)
app.use('/analyzer', analyzerRouter)
app.use('/formatter', formatterRouter)
app.use('/transformer', transformerRouter)
app.use('/searcher', searcherRouter)

const port = 3000
app.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`)
})
