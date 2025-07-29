import { Router } from "express";
import { getAllLocais, getLocalById,getLocalsByStatus,deleteLocal,createLocal} from "../controllers/local.controllers.js"

const router = Router()

router.get("/",getAllLocais)
router.get("/id",getLocalById)
router.get("/status/:status",getLocalsByStatus)
router.post("/",createLocal)
router.delete("/",deleteLocal)

export default router