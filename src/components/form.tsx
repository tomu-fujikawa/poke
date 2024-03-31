import { paths } from '../paths';
import { useRouter } from "next/router";
import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const IndexPage = () => {
  const router = useRouter();
  const onClick = () => {
    router.push(paths.pokemon+"?pokemonNumber="+pokemonNumber);
  }

const [pokemonNumber, setPokemonNumber] = useState("");

  return (
    <div>
      <h1>ポケモン</h1>
      {/* <button onClick={handleClick}>チェンジ</button>
      <img src={pokemonImageUrl}/>   */}
      <input type="text" name="example" placeholder="入力してください" value={pokemonNumber}
        onChange={(event) => setPokemonNumber(event.target.value)}></input>
    <button onClick={onClick}>閲覧ページへ</button>
    </div>
  );
};

export default IndexPage;