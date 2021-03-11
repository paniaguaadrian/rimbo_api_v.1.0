import path from "path";
import bodyParser from "body-parser";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// * Routes imported
import TenancyRoutes from "./routes/TenancyRoutes.js";
import TenantUserRoutes from "./routes/TenantUserRoutes.js";
import PMUserRoutes from "./routes/PMUserRoutes.js";
import AgentUserRoutes from "./routes/AgentUserRoutes.js";
import PropertyRoutes from "./routes/PropertyRoutes.js";
import LandlordUserRoutes from "./routes/LandlordUserRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.set("trust proxy", true);

// * Cors
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const __dirname = path.resolve();
app.use(express.static("."));
app.use(express.static(path.join(__dirname, "")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Rimbo Rent API is Working...! ");
});

app.use("/api/tenants", TenantUserRoutes);
app.use("/api/tenancies", TenancyRoutes);
app.use("/api/pms", PMUserRoutes);
app.use("/api/agents", AgentUserRoutes);
app.use("/api/properties", PropertyRoutes);
app.use("/api/landlords", LandlordUserRoutes);

// * Error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT | 8081;

app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold
  )
);
