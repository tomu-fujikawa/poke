import { useSearchParams } from "next/navigation";
import { paths } from "../../paths";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

const IndexPage = () => {
  const router = useRouter();
  const onClick = () => {
    router.push(paths.index);
  };
  const useParams = (): {
    pokemonNumber: number;
  } => {
    const searchParams = useSearchParams();
    const pokemonNumber = searchParams?.get("pokemonNumber");
    return { pokemonNumber: Number(pokemonNumber) };
  };
  const [pokemonInfo, setPokemonInfo] = useState<any>({});
  const { pokemonNumber } = useParams();
  useEffect(() => {
    const fetchPokemon = async () => {
      const [resJapanese, resEnglish] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`),
      ]);
      const [resultJapanese, resultEnglish] = await Promise.all([
        resJapanese.json(),
        resEnglish.json(),
      ]);

      const result = {
        ...resultJapanese,
        pokemonImg: resultEnglish.sprites.front_default,
      };
      console.log("result", result);
      return result;
    };
    fetchPokemon().then((pokemon) => {
      const pokemonData = {
        id: pokemon["id"],
        name: pokemon["names"][0]["name"],
        imageUrl: pokemon["pokemonImg"],
      };
      setPokemonInfo(pokemonData);
    });
    console.log("pokemonInfo", pokemonInfo);
  }, [pokemonNumber]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box component="h1">{pokemonInfo.name}</Box>
      <Box component="img" src={pokemonInfo.imageUrl} sx={{ width: "50%" }} />
      <Button onClick={onClick} variant="contained" color="primary">
        質問ページへ
      </Button>
    </Box>
  );
};

export default IndexPage;
