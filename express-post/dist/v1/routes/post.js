"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
exports.postRouter = (0, express_1.Router)();
const types_1 = require("../utils/types");
exports.postRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, caption } = req.body;
        const id = Math.floor(Math.random() * 1000) + 1;
        types_1.POSTS.push({ id, image, caption });
        return genericResponse(res, "Post created successgully", { post: { id, image, caption } }, 200);
    }
    catch (err) {
        if (err instanceof Error)
            return genericResponse(res, "Internal Server Error", null, 500, err.message);
    }
}));
exports.postRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idNum = parseInt(id);
        const post = types_1.POSTS.find((post) => post.id === idNum);
        return genericResponse(res, "Post fetched successfully", { post }, 200);
    }
    catch (err) {
        if (err instanceof Error)
            return genericResponse(res, "Internal Server Error", null, 500, err.message);
    }
}));
exports.postRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return genericResponse(res, "Posts fetched successfully", { posts: types_1.POSTS }, 200);
    }
    catch (err) {
        if (err instanceof Error)
            return genericResponse(res, "Internal Server Error", null, 500, err.message);
    }
}));
exports.postRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { caption, image } = req.body;
        const idNum = parseInt(id);
        types_1.POSTS.forEach((post, index) => {
            if (post.id === idNum) {
                types_1.POSTS[index].caption = caption;
                types_1.POSTS[index].image = image;
            }
        });
        return genericResponse(res, "Post updated successfully", null, 200);
    }
    catch (err) {
        if (err instanceof Error)
            return genericResponse(res, "Internal Server Error", null, 500, err.message);
    }
}));
exports.postRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idNum = parseInt(id);
        types_1.POSTS.forEach((post, index) => {
            if (post.id === idNum)
                types_1.POSTS.splice(index, 1);
        });
        return genericResponse(res, "Post deleted successfully", null, 200);
    }
    catch (err) {
        if (err instanceof Error)
            return genericResponse(res, "Internal Server Error", null, 500, err.message);
    }
}));
const genericResponse = (res, message, data = null, status = 200, error = null) => {
    res.status(status).json({ message, data, error });
};
