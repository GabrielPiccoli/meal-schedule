import { MealPeriod } from "@modules/meals/dtos/MealPeriod";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";
import { MealsRepositoryInMemory } from "@modules/meals/repositories/in-memory/MealsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateMealUseCase } from "../createMeal/CreateMealUseCase";
import { DeleteMealUseCase } from "./DeleteMealUseCase";

let mealsRepositoryInMemory: IMealsRepository;
let createMealUseCase: CreateMealUseCase;
let deleteMealUseCase: DeleteMealUseCase;

describe("Delete Meal", () => {
  beforeEach(() => {
    mealsRepositoryInMemory = new MealsRepositoryInMemory();
    createMealUseCase = new CreateMealUseCase(mealsRepositoryInMemory);
    deleteMealUseCase = new DeleteMealUseCase(mealsRepositoryInMemory);
  });

  it("should be able to delete a meal", async () => {
    const meal = await createMealUseCase.execute({
      description: "description",
      meal_date: new Date("2022-03-28"),
      period: MealPeriod.BREAKFAST,
      profile_id: "123",
    });

    await deleteMealUseCase.execute(meal.id);

    const meals = await mealsRepositoryInMemory.list("123");

    expect(meals.length).toBe(0);
  });

  it("should not be able to delete a non exists meal", async () => {
    await expect(deleteMealUseCase.execute("123")).rejects.toEqual(
      new AppError("The meal does not exists")
    );
  });
});
