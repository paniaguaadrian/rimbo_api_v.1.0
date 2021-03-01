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
// Tenants
import TenantUpdateUserRoutes from "./routes/TenantUpdateUserRoutes.js";
import TenantStripeUserRoutes from "./routes/TenantStripeUserRoutes.js";
import TenantGetAllUserRoutes from "./routes/TenantGetAllUserRoutes.js";
import TenantGetOneUserRoutes from "./routes/TenantGetOneUserRoutes.js";

// Tenancy
import TenancyRoutes from "./routes/TenancyRoutes.js";
import TenancyGetOneRoutes from "./routes/TenancyGetOneRoutes.js";

// Rest
import PMUserRoutes from "./routes/PMUserRoutes.js";
import AgentUserRoutes from "./routes/AgentUserRoutes.js";
import PropertyRoutes from "./routes/PropertyRoutes.js";
import LandlordUserRoutes from "./routes/LandlordUserRoutes.js";

// Enso - Product - Stripe
import EnsoTenantUserRoutes from "./routes/EnsoTenantUserRoutes.js";
// * End routes //////////////////////////////////////

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

app.use(express.static("."));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Rimbo Rent API is Working...! ");
});

// * Get Tenants routes
app.use("/api/tenants", TenantGetAllUserRoutes);
app.use("/api/tenant/:randomID", TenantGetOneUserRoutes);

// * Register new Tenant (RJ2) routes
app.use("/api/tenants/:randomID", TenantUpdateUserRoutes);

// * Register new Tenant (RJ3) routes
app.use("/api/tenants/stripe/:randomID", TenantStripeUserRoutes);

// *  Tenancy (RJ1) routes
// ! post and get requests
app.use("/api/tenancies", TenancyRoutes);

// * Get One Tenancy Route (RJ2)
app.use("/api/tenancy/:tenancyID", TenancyGetOneRoutes);

// * Get diffeerent information routes
app.use("/api/pms", PMUserRoutes);
app.use("/api/agents", AgentUserRoutes);
app.use("/api/properties", PropertyRoutes);
app.use("/api/landlords", LandlordUserRoutes);

// * Enso - Product - Stripe
app.use("/api/enso/tenants", EnsoTenantUserRoutes);

// * Error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT | 8080;

app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold
  )
);
