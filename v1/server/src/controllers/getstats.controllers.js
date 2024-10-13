
import ApiError from "../utils/ApiError.utils.js";
import ApiSuccess from "../utils/ApiSuccess.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

const getStats = asyncHandler(async (req, res) => {

    try {
        let isShutdownRequested = false
        let messageAck = 'Data received successfully'
    
        if (req.systemInfo?.shutdownRequested) {
            isShutdownRequested = true
            messageAck = 'Shutdown request received'
            // req.systemInfo.shutdownRequested = false
        }
    
        const options = {
            httpOnly : true,
            secure: true
        }
        console.log(JSON.stringify(req.systemInfo));
        
        return res.status(200)
            .cookie("systemInfo", JSON.stringify(req.systemInfo),options)
            .json(
                new ApiSuccess(200, {
                    "shutdown": isShutdownRequested
                }, messageAck)
            )
    } catch (error) {
        throw new ApiError(500,"Something went wrong while returning getstats data !!!",error?.message)
    }
})

export {
    getStats
}