const express = require("express");
// const app = express();
// const router = express.Router();
const routes = require("./routers/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/config");
const logger = require("./utils/other/logger").logger;
const cluster = require('cluster');
let numCPUs = require('os').cpus().length;

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// app.use(cors());
// app.use(router);
// router.use("/api",routes);
const PORT = config.port;
// app.listen(PORT,()=>{
//     logger.info(`Listening on PORT :${PORT}`);
//     console.log("server started : ",PORT)
// }) 


if (numCPUs > 4) {
    numCPUs =4 ;
}



if (cluster.isMaster) {
    // create a worker for each CPU
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker) => {
        // logger.info(`worker online, worker id: ${worker.id}`);
    });
    //if worker dies, create another one
    cluster.on('exit', (worker, code, signal) => {
        logger.error(`worker died, worker id: ${worker.id} | signal: ${signal} | code: ${code}`);
        cluster.fork();
    });
} else {
    //create express app
    const app = express();
    const router = express.Router();
  
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(cors()); // Use cors
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(router);  // tell the app this is the router we are using

    // User auth routes
    router.use("/api", routes);

    app.listen(PORT, function () {
        logger.info(`worker started: ${cluster.worker.id} | server listening on port: ${PORT}`);
    });
}