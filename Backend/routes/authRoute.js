import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { Callback, Me } from '../controllers/OAuth.Controller.js'

const router = express.Router()

router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get("/google/callback",
  passport.authenticate('google', { session: false }), Callback)

router.get('/me', authMiddleware, Me)

export default router