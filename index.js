import express from "express"
import config from "./config"


let Winston = require("winston")

let logger = new Winston.Logger({
    transports: [
        new Winston.transports.Console({
            level: "silly",
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ]
});

let exp = express();

let bodyParser = require("body-parser")


exp.use(bodyParser.json())
exp.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}))


exp.get("/", (req, res) => {
    res.json("Hello")
})
// Start listen
exp.listen(config.port, (err) => {
    if (err) {
        logger.error(err)
        return
    }
    logger.info(`Listening on port ${config.port}`)
})
