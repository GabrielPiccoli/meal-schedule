import { Router } from "express";

import { CreateSeoController } from "@modules/seo/useCases/createSEO/CreateSeoController";
import { DeleteSeoController } from "@modules/seo/useCases/deleteSeo/DeleteSeoController";
import { GetSeoController } from "@modules/seo/useCases/getSeo/GetSeoController";
import { UpdateSeoController } from "@modules/seo/useCases/updateSeo/UpdateSeoController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const seoRoutes = Router();

const createSeoController = new CreateSeoController();
const getSeoController = new GetSeoController();
const updateSeoController = new UpdateSeoController();
const deleteSeoController = new DeleteSeoController();

seoRoutes.post("/", ensureAuthenticated, createSeoController.handle);
seoRoutes.get("/", ensureAuthenticated, getSeoController.handle);
seoRoutes.put("/", ensureAuthenticated, updateSeoController.handle);
seoRoutes.delete("/", ensureAuthenticated, deleteSeoController.handle);

export { seoRoutes };
