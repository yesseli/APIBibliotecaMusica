const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const { getItems, getItem, createItem, deleteItem } = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");


/** 
 * Get all storages
 * @openapi
 * /storage:
 *      get:
 *          tags:
 *              - storage
 *          summary: "Listar archivos"
 *          description: "Obten todas las listas de los archivos"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: retorna la lista de los archivos
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              type: array
 *                          items:
 *                              $ref: "#/components/schemas/storage"
 *              '422':
 *                  description: Error de validación
 */
router.get("/", getItems);

/** 
 * Get detail from storage
 * @openapi
 * /storage/{id}:
 *      get:
 *          tags:
 *              - storage
 *          summary: "Detalle storage"
 *          description: "Obten el detalle de una storage"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - name: id
 *              in: path
 *              description: ID de storage a retornar
 *              required: true
 *              schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: retorna el objeto de la storage
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              $ref: "#/components/schemas/storage"
 *              '422':
 *                  description: Error de validación
 */
router.get("/:id", validatorGetItem, getItem);

/** 
 * Upload file
 * @openapi
 * /storage:
 *      post:
 *          tags:
 *              - storage
 *          summary: "Cargar archivo"
 *          description: "subir un archivo"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: retorna el objeto insertado en la colección
 *              '422':
 *                  description: Error de validación
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              myfile:
 *                                  type: string
 *                                  format: binary
 */
router.post("/", uploadMiddleware.single("myfile"), createItem);

/** 
 * Delete storage
 * @openapi
 * /storage/{id}:
 *      delete:
 *          tags:
 *              - storage
 *          summary: "Eliminar storage"
 *          description: "eliminar el detalle de una storage"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - name: id
 *                in: path
 *                description: id del storage a eliminar
 *                required: true
 *                schema:
 *                    type: string
 *          responses:
 *              '200':
 *                  description: Storage eliminado
 *              '422':
 *                  description: Error de validacion
 */
router.delete("/:id", validatorGetItem, deleteItem);


module.exports = router;