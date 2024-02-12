const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

router.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_unDoQsj8y1g9yW",
      key_secret: "LjtwiHNkylfjNYdF4EIjDe3g"
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error creating order");
    } else {
      return res.json(order);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", "LjtwiHNkylfjNYdF4EIjDe3g");
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      razorpay_signature: razorpay_signature
    });
    console.log(res)
  });
  



module.exports = router;
