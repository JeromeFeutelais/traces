import { Router } from "express"
import * as traceController from "./controllers/tracesController"
let router = Router();

router.post("/trace", traceController.getTrace)
module.exports  = router