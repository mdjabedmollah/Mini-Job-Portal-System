import express from 'express'
import { auth, isAdmin } from '../middleware/auth.js'
import { allJob, JobAdmin, jobDelete, JobId, Update } from '../controller/jobController.js'
const router=express.Router()

router.post('/admin',auth,isAdmin,JobAdmin)
router.get('/All',allJob)
router.get('/:id',JobId)
router.put('/update/:id',Update)
router.delete('/delete/:id',jobDelete)

export default router