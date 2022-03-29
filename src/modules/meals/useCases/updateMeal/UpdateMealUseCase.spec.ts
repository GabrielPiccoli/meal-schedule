import { MealPeriod } from "@modules/meals/dtos/MealPeriod";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";
import { MealsRepositoryInMemory } from "@modules/meals/repositories/in-memory/MealsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateMealUseCase } from "../createMeal/CreateMealUseCase";
import { UpdateMealUseCase } from "./UpdateMealUseCase";

let mealsRepositoryInMemory: IMealsRepository;
let createMealUseCase: CreateMealUseCase;
let updateMealUseCase: UpdateMealUseCase;

describe("Delete Meal", () => {
  beforeEach(() => {
    mealsRepositoryInMemory = new MealsRepositoryInMemory();
    createMealUseCase = new CreateMealUseCase(mealsRepositoryInMemory);
    updateMealUseCase = new UpdateMealUseCase(mealsRepositoryInMemory);
  });

  it("should be able to update a meal", async () => {
    const meal = await createMealUseCase.execute({
      description: "description",
      meal_date: new Date("2022-03-28"),
      period: MealPeriod.BREAKFAST,
      profile_id: "123",
    });

    const mealUpdated = await updateMealUseCase.execute({
      description: "description updated",
      meal_date: new Date("2022-03-28"),
      period: MealPeriod.LUNCH,
      profile_id: "123",
      id: meal.id,
    });

    expect(mealUpdated.description).toBe("description updated");
  });

  it("should not be able to update a non exists meal", async () => {
    await expect(
      updateMealUseCase.execute({
        description: "description updated",
        meal_date: new Date("2022-03-28"),
        period: MealPeriod.LUNCH,
        profile_id: "123",
        id: "321",
      })
    ).rejects.toEqual(new AppError("The meal does not exists"));
  });

  it("should not be able to update a meal with non exists period", async () => {
    const meal = await createMealUseCase.execute({
      description: "description",
      meal_date: new Date("2022-03-28"),
      period: MealPeriod.BREAKFAST,
      profile_id: "123",
    });

    await expect(
      updateMealUseCase.execute({
        description: "description updated",
        meal_date: new Date("2022-03-28"),
        period: "teste" as MealPeriod,
        profile_id: "123",
        id: meal.id,
      })
    ).rejects.toEqual(new AppError("teste is not a valid period"));
  });

  it("should not be able to update a meal in the same day and period of another meal", async () => {
    const meal_date = new Date();

    const meal = await createMealUseCase.execute({
      description: "description",
      meal_date: new Date("2022-03-28"),
      period: MealPeriod.BREAKFAST,
      profile_id: "123",
    });

    await createMealUseCase.execute({
      description: "description2",
      meal_date,
      period: MealPeriod.LUNCH,
      profile_id: "123",
    });

    await expect(
      updateMealUseCase.execute({
        description: "description updated",
        meal_date,
        period: MealPeriod.LUNCH,
        profile_id: "123",
        id: meal.id,
      })
    ).rejects.toEqual(
      new AppError("A meal already exists in the same day and period")
    );
  });
});
