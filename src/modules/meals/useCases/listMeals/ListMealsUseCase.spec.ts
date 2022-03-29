import { MealPeriod } from "@modules/meals/dtos/MealPeriod";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";
import { MealsRepositoryInMemory } from "@modules/meals/repositories/in-memory/MealsRepositoryInMemory";

import { CreateMealUseCase } from "../createMeal/CreateMealUseCase";
import { ListMealsUseCase } from "./ListMealsUseCase";

let mealsRepositoryInMemory: IMealsRepository;
let createMealUseCase: CreateMealUseCase;
let listMealsUseCase: ListMealsUseCase;

describe("List Meals", () => {
  beforeEach(() => {
    mealsRepositoryInMemory = new MealsRepositoryInMemory();
    createMealUseCase = new CreateMealUseCase(mealsRepositoryInMemory);
    listMealsUseCase = new ListMealsUseCase(mealsRepositoryInMemory);
  });

  it("should be able to list all meals", async () => {
    await createMealUseCase.execute({
      description: "description",
      meal_date: new Date("2022-03-28"),
      period: MealPeriod.BREAKFAST,
      profile_id: "123",
    });

    const meals = await listMealsUseCase.execute("123");

    expect(meals.length).toBe(1);
  });
});
