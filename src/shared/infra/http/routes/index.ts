import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { mealsRoutes } from "./meals.routes";
import { profilesRoutes } from "./profiles.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/profiles", profilesRoutes);
router.use("/meals", mealsRoutes);

export { router };
