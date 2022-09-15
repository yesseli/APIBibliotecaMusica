const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const { validatorCreateItem, validatorGetItem, validatorUpdateItem } = require("../validators/tracks")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");

/**
 * Get all tracks
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Listar canciones"
 *      description: Obten todas las listas de las canciones
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las canciones.
 *        '422':
 *          description: Error de validacion.
 */
 router.get("/", authMiddleware,getItems);




/**
 * Get track
 * @openapi
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Detalle cancion"
 *      description: Obten el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", authMiddleware,validatorGetItem, getItem);


/**
 * Register new track
 * @openapi
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: "Register track"
 *      description: Registra una cancion y obtener el detalle del registro
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
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
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/track"
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