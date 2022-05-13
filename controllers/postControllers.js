const response = require("../response");
const Post = require("../model/postModel");
const errHandler = require("../errHandler");
const { findByIdAndDelete } = require("../model/postModel");

const get = errHandler(async (req, res) => {
    const posts = await Post.find();
    response.success(req, res, posts)
})

const post = errHandler(async (req, res, next) => {
    const { body } = req;
    if (body.content && body.name) {
        const addPost = await Post.create({
            name: body.name,
            tags: body.tags,
            type: body.type || "person",
            image: body.image || "https://i.imgur.com/vMMdWt5.jpg",
            content: body.content,
        })
        response.success(req, res, addPost);
    } else {
        response.falsed(400, "請填寫內容", next);
    }
})

const deleteOne = errHandler(async (req, res, next) => {
    const { body } = req;
    const id = body._id;
    if (id) {
        const post = await Post.findByIdAndDelete(id);
        if (post === null) {
            response.falsed(400, "此id不存在", next);
        } else {
            response.success(req, res, post);
        }
    } else {
        response.falsed(400, "請填寫id", next)
    }

})

const updateOne = errHandler( async(req,res,next)=>{
    const { body } = req;
    const id = body._id;
    const post = {
        name: body.name,
        tags: body.tags,
        type: body.type,
        image: body.image,
        content: body.content
    };
    if (id) {
        const updatePost = await Post.findByIdAndUpdate(id,post);
        response.success(req, res, updatePost);
    } else {
        response.falsed(400, "請填寫id", next)
    }
})

module.exports = { get, post, deleteOne, updateOne}