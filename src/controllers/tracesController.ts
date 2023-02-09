import { Request, Response } from "express";
import Trace from "../models/trace";

export async function getTrace(req: Request, res : Response) {
  res.end()
  let IP
if (req.headers['x-client-ip']) {
    IP = req.headers['x-client-ip']
  } else {
  //IP = req.connection.remoteAddress
  IP = req.socket.remoteAddress
}
  console.log(req.socket)
  const trace = new Trace({ IP: IP, trace: req.body })
  trace.save()
  console.log('trace', IP)
}