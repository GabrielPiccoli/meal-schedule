import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { profilesRoutes } from "./profiles.routes";
import { seoRoutes } from "./seo.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/profiles", profilesRoutes);
router.use("/seo", seoRoutes);

export { router };
