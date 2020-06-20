import express from 'express'
import ResponseMessage from '../common/responseMessage.js'
import grpc from 'grpc'
import protoLoader from '@grpc/proto-loader'

export const router = express.Router()

/**
 * @swagger
 * path:
 *  /:
 *    get:
 *      summary: Hello World
 *      tags: [Index]
 *      responses:
 *        "200":
 *          description: An result object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ResponseMessage'
 */
router.get('/', (req, res) => {
    const packageDefinition = protoLoader.loadSync(
        '/home/akari/Projects/nodejs-gateway/route_guide.proto',
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    const rpc = grpc.loadPackageDefinition(packageDefinition);
    const client = new rpc.RouteGuide('localhost:50051', grpc.credentials.createInsecure())
    client.GetFeature({ latitude: 1, longitude: 2 }, (err, resp) => {
        res.json(new ResponseMessage(0, resp.msg))
    })
})