import { getRepository } from "typeorm";

import { Recipe } from "./entity/recipe";
import { Rate } from "./entity/rate";
import { User } from "./entity/user";

export async function seedDatabase() {
  const recipeRepository = getRepository(Recipe);
  const ratingsRepository = getRepository(Rate);
  const userRepository = getRepository(User);

  const defaultUser = userRepository.create({
    email: "user@example.com",
    nickname: "user1",
    password: "testtesting",
  });

  const defaultUser2 = userRepository.create({
    email: "user2@example.com",
    nickname: "user2",
    password: "test",
  });

  await userRepository.save([defaultUser, defaultUser2]);

  const [recipe1, recipe2] = recipeRepository.create([
    {
      title: "Recipe 1",
      description: "Desc 1",
      author: defaultUser,
    },
    {
      title: "Recipe 2",
      author: defaultUser2
    },
  ]);
  await recipeRepository.save([recipe1, recipe2]);

  const ratings = ratingsRepository.create([
    { value: 2, user: defaultUser2, recipe: recipe1 },
    { value: 4, user: defaultUser, recipe: recipe1 },
    { value: 5, user: defaultUser, recipe: recipe1 },
    { value: 3, user: defaultUser2, recipe: recipe1 },
    { value: 4, user: defaultUser, recipe: recipe1 },

    { value: 2, user: defaultUser, recipe: recipe2 },
    { value: 4, user: defaultUser, recipe: recipe2 },
  ]);
  await ratingsRepository.save(ratings);

  return {
    defaultUser
  };
}

export type Lazy<T extends object> = Promise<T> | T;
