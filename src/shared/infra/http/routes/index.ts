import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { profilesRoutes } from "./profiles.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/profiles", profilesRoutes);

export { router };
