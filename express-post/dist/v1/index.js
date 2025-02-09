"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const post_1 = require("./routes/post");
exports.router = (0, express_1.Router)();
exports.router.use("/post", post_1.postRouter);
