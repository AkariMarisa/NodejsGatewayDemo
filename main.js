import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { router as indexRouter } from './router/index.js'

const app = express()
// Server port
const PORT = 8000

const corsOptions = {
    optionsSuccessStatus: 200
}

// Swagger set up
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Nodejs Gateway',
            version: '1.0.0',
            description:
                'A Gateway implement with nodejs and express.'
        },
        servers: [
            {
                url: 'http://localhost:8000'
            }
        ]
    },
    apis: [
        './common/responseMessage.js',
        './router/index.js'
    ]
};
const specs = swaggerJsdoc(options);

function serverStartup() {
    // Enable CORS
    app.use(cors(corsOptions))

    // Morgan Logging
    app.use(logger('dev'))

    // Swagger ui
    app.use('/docs', swaggerUi.serve);
    app.get(
        '/docs',
        swaggerUi.setup(specs, {
            explorer: true
        })
    );

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
