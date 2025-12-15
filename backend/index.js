import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './router/authRoute.js'
import adminRoute from './router/jobRoute.js'

import applicationRoute from './router/applicationRoute.js'
import { DBconnection } from './utils/db.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 3002
//Data base

DBconnection()

//middleware 
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mini-job-portal-system.vercel.app"
  ],
  credentials: true
}))

// all api
app.use('/api/auth',authRoute)
app.use('/api/job',adminRoute)
app.use('/api/job',applicationRoute)




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
