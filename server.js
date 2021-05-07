import app from "./app";
let server;
let port = 3001;
let { NODE_ENV, PORT: productionPort, IP: productionIP } = process.env;

if (NODE_ENV === "development") {
  server = app.listen(port, () => {
    console.log(`Live server running in on port ${port}`);
  });
} else {
  server = app.listen(productionPort, productionIP, () => {
    console.log(`Live server running heroku ${productionIP}:${productionPort}`);
  });
}

export default server;
