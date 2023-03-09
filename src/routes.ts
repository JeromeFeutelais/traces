import { Router } from "express"
import * as traceController from "./controllers/tracesController"
import * as userController from "./controllers/userController"
let router = Router();

router.post("/trace", traceController.getTrace)
router.post("/user/login", userController.login)
router.post("/user/create", userController.createUser)
router.post("/user/validate", userController.validateUser)

module.exports  = router