import path from "path";
import bodyParser from "body-parser";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Routes imported
import stripeUserRoutes from "./routes/stripeUserRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.set("trust proxy", true);

// Cors
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("."));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Rimbo Rent | Enso co-living API is ready to roll!");
});

app.use("/api/tenancies", stripeUserRoutes);

// Error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold
  )
);
