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
import Head from "next/head";

const Center: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => (
  <div
    style={{
      maxWidth: "600px",
      paddingLeft: "2rem",
      paddingRight: "2rem",
      marginTop: "40px",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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
      getRecipe().then((recipe) => {
        setRecipe(recipe);
        setIsLoading(false);
      });
    }
  }, [isInitialized]);

  const toReplace = ((recipe as any)?.image as string)?.split("/image");
  const imageUrl = recipe
    ? `https://img.hellofresh.com/w_600,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/image${toReplace[1]}`
    : undefined;
  return (
    <>
      <Head>
        <title>Recipe Roulette</title>
      </Head>
      <Center>
        <>
          <Text>
            {isLoading ? "Finder opskrift..." : "Hvad med at lave..."}
          </Text>

          {recipe && !isLoading ? (
            <>
              <Link
                href={`https://www.hellofresh.dk/recipes/${
                  (recipe as any).slug
                }-${(recipe as any).recipeId}`}
              >
                <h1 style={{ marginBottom: 0 }}>{(recipe as any).title}</h1>
              </Link>
              <h2>{(recipe as any).headline}</h2>
            </>
          ) : (
            <h1>...</h1>
          )}
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          {imageUrl && (
            <img src={imageUrl} alt="" style={{ borderRadius: "12px" }} />
          )}
          <Spacer />
          <Button onClick={() => setIsInitialized(false)}>
            {isLoading && <Loading />}
            {!isLoading && "Nej tak, om igen"}
          </Button>
        </>
      </Center>
    </>
  );
}
