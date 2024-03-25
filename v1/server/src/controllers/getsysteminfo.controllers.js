
import ApiSuccess from "../utils/ApiSuccess.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

const getSystemInfo = asyncHandler ( async (req,res) => {
    
    const systemInfoCookie = req.systemInfo;
    // const parsedSystemInfo = systemInfoCookie ? JSON.parse(systemInfoCookie) : null;
    // console.log("Req===>",req.systemInfo);
    const options = {
        httpOnly : true,
        secure: true
    }

    return res.status(200)
    .cookie("systemInfo", JSON.stringify(systemInfoCookie),options)
    .json(
        new ApiSuccess(200,systemInfoCookie,'All Client PC System Stats !!!')
    )
})

export  {getSystemInfo}