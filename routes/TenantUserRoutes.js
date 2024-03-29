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
  rejectTenantRimbo,
  getAllTenants,
  getSingleTenant,
  registerTenantRJ3,
  acceptTenantPM,
  rejectTenantPM,
  acceptTenantCard,
  controlTenantReminder,
  deleteTenantData,
  // Enso
  registerEnsoTenants,
  getAllEnsoTenants,
  // StarCity
  addFilesTenantSC,
  tenantTryPayment,
  // Ukio
  addFilesTenantUkio,
  // Big Demo
  registerTenantBigDemoRJ2,
  registerTenantBigDemoRJ3,
  // Short-Term
  getTenantByBookingID,
  registerTenantCard,
  // Test short-term
  testUpdateTenant,
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
router.route("/tenant/:randomID/rejected").post(rejectTenantRimbo);
router.route("/tenant/:randomID/payment/try").post(tenantTryPayment);
router.route("/tenant/:randomID/pm/approved").post(acceptTenantPM);
router.route("/tenant/:randomID/pm/rejected").post(rejectTenantPM);
router.route("/tenant/:randomID/card/approved").post(acceptTenantCard);
router.route("/stripe/:randomID").post(registerTenantRJ3);
// Control tenant after RJ1 pre RJ2
router.route("/tenant/:randomID/reminder").post(controlTenantReminder);
router.route("/tenant/:randomID/delete/tenant/data").post(deleteTenantData);

// Enso Product
router.route("/enso").get(getAllEnsoTenants).post(registerEnsoTenants);

// StarCity Product
router
  .route("/tenant/:randomID/starcity/upload")
  .post(upload.any(), addFilesTenantSC);

// Ukio Product
router
  .route("/tenant/:randomID/ukio/upload")
  .post(upload.any(), addFilesTenantUkio);

// Big Demo
router.route("/tenant/bigdemo/:randomID").post(registerTenantBigDemoRJ2);
router.route("/stripe/bigdemo/:randomID").post(registerTenantBigDemoRJ3);

// Short-Term
router.route("/tenant/short-term/:bookingID").get(getTenantByBookingID);
router.route("/stripe/short-term/:bookingID").post(registerTenantCard);
//  test short-term
router.route("/tenant/accepted/:bookingID").post(testUpdateTenant);

export default router;
