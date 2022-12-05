import { getApiToken } from "./getApiToken";

/**
 * Gets a random recipe from the HelloFresh API
 */
export const getRecipe = async () => {
  const token = await getApiToken();
  const res = await fetch(
    `https://www.hellofresh.com/gw/api/recipes/search/suggestions?country=dk&locale=da-DK&take=100`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data: CMSResponse = await res.json();
  const items = data.items.flatMap((item) => item.items);
  const randomItem = items[Math.floor(Math.random() * items.length)];

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

type CMSResponse = {
  count: number;
  items: ItemGroup[];
  skip: number;
  take: number;
  total: number | null;
};

type ItemGroup = {
  group: string;
  group_title: string;
  items: RecipeSearchResult[];
};

type RecipeSearchResult = {
  headline: string;
  image: string;
  recipeId: string;
  slug: string;
  title: string;
};
