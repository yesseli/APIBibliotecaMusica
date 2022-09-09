const express = require("express");
const router = express.Router();
const { validatorLogin, validatorRegister } = require("../validators/auth")
const { registerCtrl, loginCtrl } = require("../controllers/auth");

/** 
 * http://localhost:3001/api
 * 
 * Route register new user 
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Register new user"
 *          description: "Esta ruta es para registrar un nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: El usuario se registra de manera correcta
 *                  '403':
 *                      description: Error por validación
 */

router.post("/register", validatorRegister, registerCtrl);

/** 
 * http://localhost:3001/api
 * 
 * login user
 * @openapi
 * /auth/login:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Loguear usuario"
 *          description: "Esta ruta es para loguear un usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authLogin"
 *          responses:
 *                  '200':
 *                      description: El usuario se logueo de manera correcta
 *                  '403':
 *                      description: Error por validación
 */

router.post("/login", validatorLogin, loginCtrl);

module.exports = router;