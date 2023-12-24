
import ApiSuccess from "../utils/ApiSuccess.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

const getSystemInfo = asyncHandler ( async (req,res) => {
    
    const systemInfoCookie = req.cookies.systemInfo;
    const parsedSystemInfo = systemInfoCookie ? JSON.parse(systemInfoCookie) : null;
    return res.status(200)
    .json(
        new ApiSuccess(200,parsedSystemInfo,'All Client PC System Stats !!!')
    )
})

export  {getSystemInfo}