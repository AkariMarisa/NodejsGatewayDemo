/**
 * @swagger
 *  components:
 *    schemas:
 *      ResponseMessage:
 *        type: object
 *        required:
 *          - code
 *          - message
 *        properties:
 *          code:
 *            type: number
 *          message:
 *            type: string
 *            description: Process description.
 *        example:
 *           code: 0
 *           message: Success
 */
export default class ResponseMessage{
    constructor(code, message) {
        this.code = code
        this.message = message
    }
}