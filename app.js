require("dotenv").config()
const express = require ("express")
const cors = require ("cors")
const swaggerUI = require("swagger-ui-express")
const morganBody = require("morgan-body");
const dbConnectNoSql = require('./config/mongo')
const {dbConnectMySql} = require("./config/mysql")
const app = express()
const port = process.env.PORT||3000
const ENGINE_DB = process.env.ENGINE_DB;
const loggerStream = require("./utils/handleLogger");
const NODE_ENV = process.env.NODE_ENV || 'development';
const openApiConfiguration = require("./docs/swagger")
app.use(cors())
app.use(express.json())
app.use(express.static("storage"))


morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  });


/**definir ruta de documentacion */

app.use(`/documentation`, swaggerUI.serve, swaggerUI.setup(openApiConfiguration))

/**
 * aqui invocamos a las rutas
 */
app.use("/api", require("./routes"))

if(NODE_ENV !== 'test'){
    app.listen(port);
};


(ENGINE_DB ==='nosql')? dbConnectNoSql() : dbConnectMySql();

module.exports = app;