import { paths } from "../paths";
import { useRouter } from "next/router";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, FormControl, TextField } from "@mui/material";

const validationSchema = Yup.object().shape({
  pokemonNumber: Yup.string()
    .required("入力してください")
    .matches(/^[0-9]+$/, "数字のみが許可されています"),
});

const initialValues = {
  pokemonNumber: "",
};

const IndexPage = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      router.push(paths.pokemon + "?pokemonNumber=" + values.pokemonNumber);
    },
  });

  const onPokemonHandleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    formik.setFieldValue("pokemonNumber", value); //第一引数にはname属性の値を指定
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box component="h1">ポケモン</Box>
      <FormControl component="form" onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          value={formik.values.pokemonNumber}
          onChange={onPokemonHandleChange}
          name="pokemonNumber"
          type="text"
          placeholder="数字を入力してください"
          error={
            formik.touched.pokemonNumber && Boolean(formik.errors.pokemonNumber)
          }
          helperText={
            formik.touched.pokemonNumber && formik.errors.pokemonNumber
          }
          sx={{
            mb:
              formik.touched.pokemonNumber && formik.errors.pokemonNumber
                ? 0
                : "20px",
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          閲覧ページへ
        </Button>
      </FormControl>
    </Box>
  );
};

export default IndexPage;
