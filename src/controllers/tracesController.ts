import { Request, Response } from "express";
import Trace from "../models/trace";

export async function getTrace(req: Request, res : Response) {
  res.end()
  let IP
if (req.headers['x-real-ip']) {
    IP = req.headers['x-real-ip']
  } else {
  //IP = req.connection.remoteAddress
  IP = req.socket.remoteAddress
}
  //console.log(req.headers)
  const trace = new Trace({ IP: IP, trace: req.body })
  trace.save()
  console.log('trace', IP)
}