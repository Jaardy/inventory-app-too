const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// GET /api/items
router.get("/", async (req, res, next) => {
	try {
		const items = await Item.findAll();
		res.send(items);
	} catch (error) {
		next(error);
	}
});

// POST /api/items
router.post("/", async (req, res, next) => {
	try {
		const item = await Item.create(req.body);
		res.status(201).send(item); // 201 Created
	} catch (error) {
		next(error);
	}
});

// GET /api/items/:id
router.get("/:id", async (req, res, next) => {
	try {
		const item = await Item.findByPk(req.params.id);
		if (item) {
			res.send(item);
		} else {
			res.status(404).send({ error: "Not Found" });
		}
	} catch (error) {
		next(error);
	}
});

// PATCH /api/items/:id
router.patch("/:id", async (req, res, next) => {
	try {
		let item = await Item.findByPk(req.params.id);
		if (item) {
			item = await item.update(req.body);
			res.send(item);
		} else {
			res.status(404).send({ error: "Not Found" });
		}
	} catch (error) {
		next(error);
	}
});

// DELETE /api/items/:id
router.delete("/:id", async (req, res, next) => {
	try {
		const item = await Item.findByPk(req.params.id);
		if (item) {
			await item.destroy();
			res.status(204).send(); // 204 No Content
		} else {
			res.status(404).send({ error: "Not Found" });
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
