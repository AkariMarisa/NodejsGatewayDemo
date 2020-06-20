import express from 'express'
import logger from 'morgan'
import { router as indexRouter } from './router/index.js'

const app = express()
// Server port
const PORT = 8000

function serverStartup() {
    app.use(logger('dev'))

    // Routing
    app.use(indexRouter)

    try {
        // Running express server
        app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
    } catch (ex) {
        console.error(ex)
        serverStartup()
    }
}

// Bootup gateway server
serverStartup()
