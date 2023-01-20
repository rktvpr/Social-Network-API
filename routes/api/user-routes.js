const router = require("express").Router()

const { getAllUsers } = require("../../controllers/user-controller")

router
    .route("/users").get(getAllUsers)

router
    .route("/users/:id").get

module.exports = router;