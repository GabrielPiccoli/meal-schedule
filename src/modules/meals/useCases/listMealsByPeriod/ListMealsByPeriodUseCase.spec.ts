import { MealPeriod } from "@modules/meals/dtos/MealPeriod";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";
import { MealsRepositoryInMemory } from "@modules/meals/repositories/in-memory/MealsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateMealUseCase } from "../createMeal/CreateMealUseCase";
import { ListMealsByPeriodUseCase } from "./ListMealsByPeriodUseCase";

let mealsRepositoryInMemory: IMealsRepository;
let createMealUseCase: CreateMealUseCase;
let listMealsByPeriodUseCase: ListMealsByPeriodUseCase;

describe("List Meals By Period", () => {
  beforeEach(() => {
    mealsRepositoryInMemory = new MealsRepositoryInMemory();
    createMealUseCase = new CreateMealUseCase(mealsRepositoryInMemory);
    listMealsByPeriodUseCase = new ListMealsByPeriodUseCase(
      mealsRepositoryInMemory
    );
  });

  it("should be able to list all meals by period", async () => {
    await createMealUseCase.execute({
      description: "description",
      meal_date: new Date("2022-03-28"),
      period: MealPeriod.BREAKFAST,
      profile_id: "123",
    });

    await createMealUseCase.execute({
      description: "description",
      meal_date: new Date("2022-03-28"),
      period: MealPeriod.DINNER,
      profile_id: "123",
    });

    const meals = await listMealsByPeriodUseCase.execute(
      MealPeriod.BREAKFAST,
      "123"
    );

    expect(meals.length).toBe(1);
  });

  it("should not be able to list a non exists meal period", async () => {
    await expect(
      listMealsByPeriodUseCase.execute("teste" as MealPeriod, "123")
    ).rejects.toEqual(new AppError("teste is not a valid period"));
  });
});
