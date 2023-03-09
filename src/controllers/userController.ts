import * as userService from '../services/userService'
import { Request, Response } from 'express';

export async function login(req:Request, res:Response) {
  const { email, password } = req.body
  try {
    const user = await userService.login(email, password)
     console.log('user', user)
    //@ts-ignore 1
    req.session.user = user
    console.log('req.session.user', req.session)
    res.status(200).json(user)
  } catch (e) {
    console.error(e)
    res.status(400).json(e)
  }
}

export async function createUser(req:Request, res:Response) {
  const { email, password } = req.body
  try {
    const user = await userService.createUser(email, password)
    res.status(200).json(user)
  } catch (e) {
    res.status(400).json(e)
  }
}

export async function validateUser(req:Request, res:Response) {
  const { email, token } = req.body
  try {
    const user = await userService.validateUser(email, token)
    res.status(200).json(user)
  } catch (e) {
    res.status(400).json(e)
  }
} 

  
