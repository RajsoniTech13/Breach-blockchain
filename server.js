import express from "express";
import blockchainRoutes from "./routes/blockchainRoutes.js";

const app = express();

app.use(express.json());

app.use("/blockchain", blockchainRoutes);

app.listen(process.env.PORT || 4001, () => {

  console.log("Blockchain service running on port 4001");

});