import { MealPeriod } from "@modules/meals/dtos/MealPeriod";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";
import { MealsRepositoryInMemory } from "@modules/meals/repositories/in-memory/MealsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateMealUseCase } from "./CreateMealUseCase";

let mealsRepositoryInMemory: IMealsRepository;
let createMealUseCase: CreateMealUseCase;

describe("Create Meal", () => {
  beforeEach(() => {
    mealsRepositoryInMemory = new MealsRepositoryInMemory();
    createMealUseCase = new CreateMealUseCase(mealsRepositoryInMemory);
  });

  it("should be able to create a meal", async () => {
    const meal = await createMealUseCase.execute({
      description: "description",
      meal_date: new Date("2022-03-28"),
      period: MealPeriod.BREAKFAST,
      profile_id: "123",
    });

    expect(meal).toHaveProperty("id");
  });

  it("should not be able to create a meal with an invalid period", async () => {
    await expect(
      createMealUseCase.execute({
        description: "description",
        meal_date: new Date("2022-03-28"),
        period: "test" as MealPeriod,
        profile_id: "123",
      })
    ).rejects.toEqual(new AppError("test is not a valid period"));
  });

  it("should not be able to create a meal in the same period and day", async () => {
    const data = new Date();

    await createMealUseCase.execute({
      description: "description",
      meal_date: data,
      period: MealPeriod.BREAKFAST,
      profile_id: "123",
    });

    await expect(
      createMealUseCase.execute({
        description: "description2",
        meal_date: data,
        period: MealPeriod.BREAKFAST,
        profile_id: "123",
      })
    ).rejects.toEqual(
      new AppError("A meal already exists in the same day and period")
    );
  });
});
