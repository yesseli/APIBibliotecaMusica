const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");

/**
 * Get all tracks
 * @openapi
 * /tracks:
 *      get:
 *          tags:
 *              - tracks
 *          summary: "List all tracks"
 *          description: "muestra el listado de tracks"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: retorna la lista de los archivos
 *              '402':
 *                  description: Error, necesitas tener los permisos
 *      responses:
 *          '201':
 *              description: retorna el objeto insertado en la coleccion con estado '201'
 */
router.get("/", authMiddleware, getItems);


/**
* Get all tracks
 * @openapi
 * /tracks/{id}:
 *      get:
 *          tags:
 *              - tracks
 *          summary: "Get track detail"
 *          description: "muestra el listado de tracks"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Id del track que desea ver
 *                required: true
 *                schema:
 *                    type: string
 *          responses:
 *              '200':
 *                  description: Retorna el detalle de track
 *              '422':
 *                  description: Error de validacion
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem);


/**
* Post new track
 * @openapi
 * /tracks:
 *      post:
 *          tags:
 *              - tracks
 *          summary: "add track"
 *          description: "insertar nuevo track"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *             - name: body
 *               in: body
 *               description: parametros requeridos para insertar
 *               required: true
 *               schema: 
 *                  $ref: "#/components/schemas/track"
 *          responses:
 *              '200':
 *                  description: Track insertado correctamente
 *              '422':
 *                  description: error de validacion
 */
router.post("/", authMiddleware, checkRol(["user", "admin"]), validatorCreateItem, createItem);


/**
* Update track
 * @openapi
 * /tracks/{id}:
 *      put:
 *          tags:
 *              - tracks
 *          summary: "update track"
 *          description: "actualizar track"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: "body"
 *                name: "body"
 *                description: "parametros requeridos para insertar"
 *                required: true
 *                schema:
 *                  $ref: "#/components/schemas/track"
 *              - in: "path"
 *                name: "id"
 *                description: "id track"
 *                required: true
 *                schema:
 *                    type: string
 *          responses:
 *              '200': 
 *                  description: track actualizada
 *              '422': 
 *                  description: erro de validacion
 */
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);


/**
* Delete track
* @openapi
* /tracks/{id}:
*      delete:
*          tags:
*              - tracks
*          summary: "delete track"
*          description: "eliminar track"
*          security:
*              - bearerAuth: []
*          parameters:
*              -  in: "path"
*                 name: "id"
*                 description: "ID track"
*                 required: true
*                 schema:
*                    type: string
*          responses:
*              '200':
*                  description: Track eliminada
*              '422':
*                  description: error de validacion
*/
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);


module.exports = router;