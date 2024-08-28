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

app.get("/khalti", async (req, res) => {
  console.log(req.body);
  try {
    const data = JSON.stringify({
      return_url: "http://localhost:3000/success",
      website_url: "http://localhost:5173/",
      amount: 1000,
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
          amount: 1000,
        },
        // {
        //   label: "VAT",
        //   amount: 300,
        // },
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
  let data;
  console.log(req.params.id);
  const fromData = {
    amount: req.params.id,
    failure_url: "http://localhost:8000/failed",
    product_delivery_charge: "0",
    product_service_charge: "0",
    product_code: "EPAYTEST",
    signature: "YVweM7CgAtZW5tRKica/BIeYFvpSj09AaInsulqNKHk=",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: "http://localhost:3000/success",
    tax_amount: "0",
    total_amount: req.params.id,
    transaction_uuid: "ab14a8f2b02c3",
  };

  var request = {
    method: "GET",
    // body: fromData,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    // "rc-epay.esewa.com.np/api/epay/main/v2/form",
    "https://rc-epay.esewa.com.np/auth",
    request
  );
  const result = await response.text();
  const resultObject = JSON.parse(result);
  console.log(result);
  if (result) {
    res.send({ url: resultObject.payment_url });
  }
});

mongoose.connect(process.env.MONGO_USER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
