import app from "./app";
let port = 3001;
let { NODE_ENV, PORT: productionPort, IP: productionIP } = process.env;

if (NODE_ENV === "development") {
  app.listen(port, () => {
    console.log(`Live server running in on port ${port}`);
  });
} else {
  app.listen(productionPort, productionIP, () => {
    console.log(`Live server running heroku ${productionIP}:${productionPort}`);
  });
}
