import { useEffect, useState } from "react";

import {
  Button,
  Container,
  Link,
  Loading,
  Spacer,
  Text,
} from "@nextui-org/react";

import { getRecipe } from "../lib/getRecipe";

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState<unknown>(undefined);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      const getRecipePromise = getRecipe();
      setIsLoading(true);
      getRecipePromise.then((recipe) => {
        setRecipe(recipe);
        setIsLoading(false);
        console.log(recipe);
      });
    }
  }, [isInitialized]);

  return (
    <Container>
      <>
        <Spacer />
        {recipe && (
          <>
            <Text>How about...</Text>
            <Link
              href={`https://www.hellofresh.com/recipes/${
                (recipe as any).slug
              }-${(recipe as any).id}`}
            >
              <h1>{(recipe as any).name}</h1>
            </Link>
          </>
        )}
        <Button onClick={() => setIsInitialized(false)}>
          {isLoading && <Loading />}
          {!isLoading && "Nope, lemme try again"}
        </Button>
      </>
    </Container>
  );
}
