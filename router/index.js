import express from 'express'

export const router = express.Router()

router.get('/', (req, res) => {
    res.json({ 'code': '0', 'message': 'Hello Word' })
})