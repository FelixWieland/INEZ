const express = require("express");
const router = express.Router();
const List = require("../models/list");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

//handle incoming requests from orders
router.get("/", checkAuth, (req, res, next) => {
	Order.find()
		.select("product quantity _id")
		.populate("product", "name") //first argument shows the linked collection, second "filters"
		.exec()
		.then(docs => {
			res.status(200).json({
				count: docs.length,
				orders: docs.map(doc => {
					return {
						_id: doc._id,
						product: doc.product,
						quantity: doc.quantity
					};
				})
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

router.post("/", checkAuth, (req, res, next) => {
	Product.findById(req.body.productId)
		.then(product => {
			if (!product) {
				return res.status(404).json({
					message: "Product not found"
				});
			}
			const order = new Order({
				_id: mongoose.Types.ObjectId(),
				quantity: req.body.quantity,
				product: req.body.productId
			});
			return order.save();
		})
		.then(result => {
			res.status(201).json({
				message: "Order stored!",
				createdOrder: {
					_id: result._id,
					product: result.product,
					quantity: result.quantity
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Product not found",
				error: err
			});
		});
});

//specific Oder details
router.get("/:orderId", checkAuth, (req, res, next) => {
	Order.findById(req.params.orderId)
		.select("product quantity _id")
		.populate("product", "id name price")
		.exec()
		.then(result => {
			res.status(200).json({
				message: "Order details",
				_id: result._id,
				quantity: result.quantity,
				product: result.product
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Product not found",
				error: err
			});
		});
});

// router.get("/:orderId", (req, res, next) => {
//   res.status(200).json({
//     message: "Order details",
//     orderId: req.params.orderId
//   });
// });

//delete a order
router.delete("/:orderId", checkAuth, (req, res, next) => {
	Order.deleteOne({ _id: req.params.orderId })
		.exec()
		.then(
			res.status(200).json({
				message: "Order deleted"
			})
		)
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});
module.exports = router;
