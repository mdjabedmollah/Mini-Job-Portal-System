import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

//middleware 
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
