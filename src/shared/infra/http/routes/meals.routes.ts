import { Router } from "express";

import { CreateMealController } from "@modules/meals/useCases/createMeal/CreateMealController";
import { DeleteMealController } from "@modules/meals/useCases/deleteMeal/DeleteMealController";
import { ListMealsController } from "@modules/meals/useCases/listMeals/ListMealsController";
import { ListMealsByPeriodController } from "@modules/meals/useCases/listMealsByPeriod/ListMealsByPeriodController";
import { UpdateMealController } from "@modules/meals/useCases/updateMeal/UpdateMealController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const mealsRoutes = Router();

const createMealController = new CreateMealController();
const listMealsController = new ListMealsController();
const deleteMealController = new DeleteMealController();
const updateMealController = new UpdateMealController();
const listMealsByPeriodController = new ListMealsByPeriodController();

mealsRoutes.post("/", ensureAuthenticated, createMealController.handle);
mealsRoutes.get("/", ensureAuthenticated, listMealsController.handle);
mealsRoutes.delete("/:id", ensureAuthenticated, deleteMealController.handle);
mealsRoutes.put("/:id", ensureAuthenticated, updateMealController.handle);
mealsRoutes.get(
  "/:period",
  ensureAuthenticated,
  listMealsByPeriodController.handle
);

export { mealsRoutes };
