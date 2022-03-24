import { Router } from "express";

import { CreateProfileController } from "@modules/profiles/useCases/createProfile/CreateProfileController";
import { DeleteProfileController } from "@modules/profiles/useCases/deleteProfile/DeleteProfileController";
import { GetProfileController } from "@modules/profiles/useCases/getProfile/GetProfileController";
import { ListProfilesController } from "@modules/profiles/useCases/listProfiles/ListProfilesController";
import { UpdateProfileController } from "@modules/profiles/useCases/updateProfile/UpdateProfileController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const profilesRoutes = Router();

const listProfilesController = new ListProfilesController();
const getProfileController = new GetProfileController();
const createProfileController = new CreateProfileController();
const updateProfileController = new UpdateProfileController();
const deleteProfileController = new DeleteProfileController();

profilesRoutes.get("/", ensureAuthenticated, listProfilesController.handle);
profilesRoutes.get("/me", ensureAuthenticated, getProfileController.handle);
profilesRoutes.post("/", createProfileController.handle);
profilesRoutes.put("/:id", ensureAuthenticated, updateProfileController.handle);
profilesRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteProfileController.handle
);

export { profilesRoutes };
