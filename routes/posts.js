var express = require('express');
var router = express.Router();
const postsControllers = require("../controllers/postControllers")

router.get("/", postsControllers.get);
router.post("/", postsControllers.post);
router.delete("/",postsControllers.deleteOne);
router.patch("/",postsControllers.updateOne);

module.exports = router;