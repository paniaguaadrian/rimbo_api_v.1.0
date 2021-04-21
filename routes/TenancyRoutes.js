import express from "express";
import path from "path";
import multerGCS from "multer-cloud-storage";
import { v4 } from "uuid";
import multer from "multer";

// Controllers
import {
  // ! Regular Flow
  registerTenancy,
  getAllTenancies,
  acceptAllTenantsRimbo,
  getSingleTenancy,
  updateSingleTenancy,
  acceptTenancyRimbo,
  // ! Badi Flow
  registerBadiTenancy,
  updateBadiSingleTenancy,

  // ! StarCity Flow
  registerStarcityTenancy,
  // ! Habitat
  registerHabitatTenancy,
} from "../controllers/TenancyController.js";

const __dirname = path.resolve();

export const upload = multer({
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

// Regular FlowRoutes
router.route("/").post(registerTenancy).get(getAllTenancies);
router
  .route("/tenancy/:tenancyID")
  .post(upload.any(), updateSingleTenancy)
  .get(getSingleTenancy);

router
  .route("/tenancy/:tenancyID/allTenantsAccepted")
  .post(acceptAllTenantsRimbo);
router
  .route("/tenancy/:tenancyID/rimbo/start-service")
  .post(acceptTenancyRimbo);

// Badi Flow Routes
router.route("/badi").post(registerBadiTenancy);
router.route("/tenancy/badi/:tenancyID").post(updateBadiSingleTenancy);
export default router;

// StarCity Flow Routes
router.route("/starcity").post(registerStarcityTenancy);

// Habitat Routes
router.route("/habitat").post(registerHabitatTenancy);
