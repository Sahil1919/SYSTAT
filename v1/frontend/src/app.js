
import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import systatRouter from './routes/routes.js'

const app = express()
app.locals.collectionsOFClientPC = {}; 

app.use(
    cors({
        origin: process.env.CORS_ORIGIN
    })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/api/v1/systat',systatRouter)


export default app