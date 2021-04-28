import express from "express";
import path from "path";
import multerGCS from "multer-cloud-storage";
import { v4 } from "uuid";
import multer from "multer";

// Controllers
import {
  // Regular
  registerTenantRJ2,
  registerTenantRJ2Upload,
  acceptTenantRimbo,
  getAllTenants,
  getSingleTenant,
  registerTenantRJ3,
  acceptTenantPM,
  acceptTenantCard,
  controlTenant24h,
  // Enso
  registerEnsoTenants,
  getAllEnsoTenants,
  // StarCity
  addFilesTenantSC,
  tenantTryPayment,
} from "../controllers/TenantUserController.js";

const __dirname = path.resolve();

const upload = multer({
  storage: multerGCS.storageEngine({
    bucket: "rimbo-files",
    keyFilename: path.join(__dirname, "./config/key.json"),
    projectId: "rimbo-302814",
    filename: (req, file, cb) => {
      const name = `${v4()}-${file.originalname.replace(/ /g, "_")}`;
      cb(null, name);
    },
  }),
});

const router = express.Router();

// General / Forms
router.route("/").get(getAllTenants);
router.route("/tenant/:randomID").get(getSingleTenant).post(registerTenantRJ2);
router
  .route("/tenant/:randomID/upload")
  .post(upload.any(), registerTenantRJ2Upload);
router.route("/tenant/:randomID/approved").post(acceptTenantRimbo);
router.route("/tenant/:randomID/payment/try").post(tenantTryPayment);
router.route("/tenant/:randomID/pm/approved").post(acceptTenantPM);
router.route("/tenant/:randomID/card/approved").post(acceptTenantCard);
router.route("/stripe/:randomID").post(registerTenantRJ3);
// Control tenant after RJ1 pre RJ2
router.route("/tenant/:randomID/24h").post(controlTenant24h);

// Enso Product
router.route("/enso").get(getAllEnsoTenants).post(registerEnsoTenants);

// StarCity Product
router
  .route("/tenant/:randomID/starcity/upload")
  .post(upload.any(), addFilesTenantSC);

export default router;
