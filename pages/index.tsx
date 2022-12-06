import { useEffect, useState } from "react";

import {
  Button,
  Container,
  Link,
  Loading,
  Spacer,
  styled,
  Text,
} from "@nextui-org/react";

import { fetchAndCacheRecipes, getRecipe } from "../lib/getRecipe";

const Center: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
    }}
    {...rest}
  >
    {children}
  </div>
);

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState<unknown>(undefined);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      const fetchRecipesPromise = fetchAndCacheRecipes();
      setIsLoading(true);
      fetchRecipesPromise.then((recipes) => {
        getRecipe(recipes).then((recipe) => {
          setRecipe(recipe);
          setIsLoading(false);
        });
      });
    }
  }, [isInitialized]);

  return (
    <Container>
      <Center>
        <>
          <Text>
            {isLoading ? "Finder opskrift..." : "Hvad med at lave..."}
          </Text>

          {recipe && !isLoading ? (
            <Link
              href={`https://www.hellofresh.dk/recipes/${
                (recipe as any).slug
              }-${(recipe as any).id}`}
            >
              <h1>{(recipe as any).name}</h1>
            </Link>
          ) : (
            <h1>...</h1>
          )}
          <Spacer />
          <Button onClick={() => setIsInitialized(false)}>
            {isLoading && <Loading />}
            {!isLoading && "Nej, om igen"}
          </Button>
        </>
      </Center>
    </Container>
  );
}
