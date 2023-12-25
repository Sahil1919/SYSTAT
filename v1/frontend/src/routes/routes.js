
import Router from "express"
import asyncDataHandle from "../middlewares/asyncDataHandler.middlewares.js"
import { getStats } from "../controllers/getstats.controllers.js"
import {getSystemInfo} from "../controllers/getsysteminfo.controllers.js"
import decryptDataHandler from "../middlewares/decryptData.middlewares.js"
const router = Router()


router.route('/getstats').post(decryptDataHandler,asyncDataHandle,getStats)

router.route("/getsysteminfo").get(getSystemInfo)

export default router