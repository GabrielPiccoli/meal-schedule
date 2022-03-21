import { Router } from "express";

import { AuthenticateProfileController } from "@modules/profiles/useCases/authenticateProfile/AuthenticateProfileController";
import { RefreshTokenController } from "@modules/profiles/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateProfileController = new AuthenticateProfileController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateProfileController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
