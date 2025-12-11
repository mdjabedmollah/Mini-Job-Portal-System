import express from 'express'
import { auth, isAdmin } from '../middleware/auth.js'
import { ApplyUser, ViewAdmin } from '../controller/applicationController.js'

const route = express.Router()

route.post('/apply/:jobId', auth, ApplyUser)
route.get('/:jobId/applicants', auth,isAdmin, ViewAdmin)

export default route
