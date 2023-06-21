import { app } from "./app";

app
  .listen({
    port: 5555,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 Server ready at http://localhost:5555");
  });
