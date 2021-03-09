import express from "express";
import path from "path";
import multerGCS from "multer-cloud-storage";
import { v4 } from "uuid";
import multer from "multer";
const __dirname = path.resolve();
const upload = multer({
  storage: multerGCS.storageEngine({
    bucket: "rimbo-files",
    keyFilename: path.join(__dirname, "./config/key.json"),
    projectId: "rimbo-302814",
    filename: (req, file, cb) => {
      const name = `${v4()}-${file.originalname}`;
      cb(null, name);
    },
  }),
});

// Controllers
import {
  registerTenancy,
  getAllTenancies,
  getSingleTenancy,
  updateSingleTenancy,
} from "../controllers/TenancyController.js";

const router = express.Router();

router.route("/").post(registerTenancy).get(getAllTenancies);
router
  .route("/tenancy/:tenancyID")
  .post(upload.any(), updateSingleTenancy)
  .post(updateSingleTenancy)
  .get(getSingleTenancy);
export default router;
