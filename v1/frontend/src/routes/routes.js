
import Router from "express"
import asyncDataHandle from "../middlewares/asyncDataHandler.middlewares.js"
import { getStats } from "../controllers/getstats.controllers.js"
import {getSystemInfo} from "../controllers/getsysteminfo.controllers.js"
import decryptDataHandler from "../middlewares/decryptData.middlewares.js"
const router = Router()

let sharedData

router.route('/getstats').post(decryptDataHandler,asyncDataHandle, (req, res, next) => {
    // Process data and store in sharedData
    sharedData = req.collectionsOFClientPC;
    next();
},getStats)

router.route("/getsysteminfo").get((req, res,next) => {
    // Access sharedData in the second route
    req.systemInfo = sharedData;
    next()
},getSystemInfo)

export default router