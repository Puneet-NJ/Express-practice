import { Router, Response } from "express";
export const postRouter = Router();
import { POSTS } from "../utils/types";

postRouter.post("/", async (req, res) => {
	try {
		const { image, caption } = req.body;

		const id = Math.floor(Math.random() * 1000) + 1;

		POSTS.push({ id, image, caption });

		return genericResponse(
			res,
			"Post created successgully",
			{ post: { id, image, caption } },
			200
		);
	} catch (err) {
		if (err instanceof Error)
			return genericResponse(
				res,
				"Internal Server Error",
				null,
				500,
				err.message
			);
	}
});

postRouter.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const idNum = parseInt(id);

		const post = POSTS.find((post) => post.id === idNum);

		return genericResponse(res, "Post fetched successfully", { post }, 200);
	} catch (err) {
		if (err instanceof Error)
			return genericResponse(
				res,
				"Internal Server Error",
				null,
				500,
				err.message
			);
	}
});

postRouter.get("/", async (req, res) => {
	try {
		return genericResponse(
			res,
			"Posts fetched successfully",
			{ posts: POSTS },
			200
		);
	} catch (err) {
		if (err instanceof Error)
			return genericResponse(
				res,
				"Internal Server Error",
				null,
				500,
				err.message
			);
	}
});

postRouter.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { caption, image } = req.body;

		const idNum = parseInt(id);

		POSTS.forEach((post, index) => {
			if (post.id === idNum) {
				POSTS[index].caption = caption;
				POSTS[index].image = image;
			}
		});

		return genericResponse(res, "Post updated successfully", null, 200);
	} catch (err) {
		if (err instanceof Error)
			return genericResponse(
				res,
				"Internal Server Error",
				null,
				500,
				err.message
			);
	}
});

postRouter.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const idNum = parseInt(id);

		POSTS.forEach((post, index) => {
			if (post.id === idNum) POSTS.splice(index, 1);
		});

		return genericResponse(res, "Post deleted successfully", null, 200);
	} catch (err) {
		if (err instanceof Error)
			return genericResponse(
				res,
				"Internal Server Error",
				null,
				500,
				err.message
			);
	}
});

const genericResponse = (
	res: Response,
	message: any,
	data: any = null,
	status: number = 200,
	error: any = null
) => {
	res.status(status).json({ message, data, error });
};
