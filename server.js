import app from "./app";



let server;
let port = 3001
server = app.listen(port, () => {
      console.log( `Live server running in on port ${port}`);
    });

export default server;