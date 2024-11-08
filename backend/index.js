const express = require("express");

const app = express();
const cors = require("cors");
const paypal = require("paypal-rest-sdk");
const authController = require("./controller/authController");
const userController = require("./controller/UserController");
const postController = require("./controller/PostController");
const uploadFile = require("./controller/FileController");
const mongoose = require("mongoose");
const applicationController = require("./controller/applicationController");
const env = require("dotenv");
const CryptoJS = require("crypto-js");
// const json = require("json()");
env.config();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authController);
app.use("/user", userController);
app.use("/job", postController);
app.use("/upload", uploadFile);
app.use("/application", applicationController);

// app.set("Access-Control-Allow-Origin", "*");

app.use(express.static("public"));
app.use("/cv", express.static("cv"));

app.use(express.static("public"));
app.use("/task", express.static("task"));

app.use(express.static("public"));
app.use("/completedTask", express.static("completedTask"));

app.get("/config/paypal", (client, server) =>
  server.send({ id: process.env.PAYPAl_CLIENT_ID })
);

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAl_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

//khalti
app.get("/khalti/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = JSON.stringify({
      return_url: "http://localhost:3000/success",
      website_url: "http://localhost:5173/",
      amount: req.params.id * 10,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: "Prabek Bir Bajracharya",
        email: "bazprabek@gmail.com",
        phone: "9861289596",
      },
      amount_breakdown: [
        {
          label: "Mark Price",
          amount: req.params.id * 10,
        },
      ],
    });
    var request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key 1d181ca95c2e4d11a67f15c6d5ea39e7`,
      },
      body: data,
    };
    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      request
    );
    const result = await response.text();
    const resultObject = JSON.parse(result);
    console.log(result);
    if (result) {
      res.send({ url: resultObject.payment_url });
    }
  } catch (err) {
    console.log(err);
  }
});

//paypal
app.get("/paypal/:id", async (req, res) => {
  let data;
  console.log(req.params.id);

  try {
    let create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:8000/failed",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: req.params.id,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: req.params.id,
          },
          description: "This is the payment description.",
        },
      ],
    };

    await paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        console.log("Create Payment Response");
        // console.log(payment);
        data = payment;
        res.json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
});



app.get("/esewa/:id", async (req, res) => {
  try {
    const uuid = Date.now();
    const secret = "8gBm/:&EnhH.1/q";
    const message = `total_amount=${req.params.id},transaction_uuid=${uuid},product_code=EPAYTEST`;
    const s = CryptoJS.HmacSHA256(message, secret);

    const formData = {
      amount: req.params.id,
      tax_amount: 0,
      total_amount: req.params.id,
      product_service_charge: 0,
      product_delivery_charge: 0,
      transaction_uuid: Date.now(),
      product_code: "EPAYTEST",
      success_url: "http://localhost:3000/success",
      failure_url: "http://localhost:3000/failed",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: CryptoJS.enc.Base64.stringify(s),
    };

    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const sewa = "https://rc-epay.esewa.com.np/auth";

    const response = await fetch(sewa, request);

    const result = await response.text();
    console.log(result);

    // // const resultObject = JSON.parse(result);
    // // console.log(resultObject);
    // if (result) {
    //   res.send({ url: result.payment_url });
    // }
  } catch (error) {
    console.log(error);
  }
});

mongoose.connect(process.env.MONGO_USER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
