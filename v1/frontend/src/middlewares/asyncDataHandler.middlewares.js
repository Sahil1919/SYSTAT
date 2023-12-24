
import ApiError from "../utils/ApiError.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

const collectionsOFClientPC = {}

const asyncDataHandle = asyncHandler(async (req, _, next) => {

    try {
        const systemInfo = req.body['CPU Stats']
        const pcNo = req.body.pc_no
        if (!systemInfo) throw new ApiError(401, "Unavailable systemInfo from client")
        
        
        if (collectionsOFClientPC[pcNo]?.shutdownRequested) {
    
            collectionsOFClientPC[pcNo].shutdownRequested = false;
    
            req.systemInfo = collectionsOFClientPC[pcNo]
    
            next()
    
        }
        else {
            collectionsOFClientPC[pcNo] = { systemInfo, pcNo, lastResponseTime: Date.now() };
            console.log(collectionsOFClientPC[pcNo]);
            req.systemInfo = collectionsOFClientPC[pcNo]
            next() 
        }
    } catch (error) {
        throw new ApiError(400,"Something went wrong while getting data from client !!!",error?.message)
    }

})

// setInterval(() => {
//     const currentTime = Date.now();
//     Object.keys(collectionsOFClientPC).forEach((pcNo) => {
//       const lastResponseTime = collectionsOFClientPC[pcNo].lastResponseTime;
//       if (currentTime - lastResponseTime > 6000) {
//         delete collectionsOFClientPC[pcNo];
//         console.log(`Removing inactive child PC: ${pcNo}`);
//       }
//     });
//   }, 1000);

export default asyncDataHandle