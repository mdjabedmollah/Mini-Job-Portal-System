import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './router/authRoute.js'
import adminRoute from './router/jobRoute.js'
import { DBconnection } from './utils/db.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 3001
//Data base

DBconnection()

//middleware 
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors())

// all api
app.use('/api/auth',authRoute)
app.use('/api/job',adminRoute)




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
