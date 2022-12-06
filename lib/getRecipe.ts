import { getApiToken } from "./getApiToken";

/**
 * Gets all recipes from the HelloFresh API
 */
export const getAllRecipes = async () => {
  const token = await getApiToken();
  const res = await fetch(
    `https://www.hellofresh.com/gw/api/recipes/search/suggestions?country=dk&locale=da-DK&take=10000`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: Collection<RecipeSearchResult> = await res.json();
  const items = data.items.flatMap((item) => item.items);
  return items;
};

/**
 * Fetches recipes from the HelloFresh API and caches them in localStorage
 */
export const fetchAndCacheRecipes = async () => {
  if (localStorage.getItem("recipes")) {
    return JSON.parse(localStorage.getItem("recipes") || "[]");
  } else {
    const recipes = await getAllRecipes();
    localStorage.setItem("recipes", JSON.stringify(recipes));
    return recipes;
  }
};

/**
 * Gets a random recipe from the HelloFresh API
 */
export const getRecipe = async (recipes: RecipeSearchResult[]) => {
  const randomItem = recipes[Math.floor(Math.random() * recipes.length)];
  const token = await getApiToken();

  const recipe = await fetch(
    `https://www.hellofresh.com/gw/api/recipes/${randomItem.recipeId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const recipeData: unknown = await recipe.json();
  return recipeData;
};

type Collection<T> = {
  count: number;
  items: ItemGroup<T>[];
  skip: number;
  take: number;
  total: number | null;
};

type ItemGroup<T> = {
  group: string;
  group_title: string;
  items: T[];
};

type RecipeSearchResult = {
  headline: string;
  image: string;
  recipeId: string;
  slug: string;
  title: string;
};
