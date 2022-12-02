import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export const TokenGenerator = () => {
  const [tokenType, setTokenType] = useState("");

  const handleChange = (event) => {
    setTokenType(event.target.value);
  };

  const data = {
    token_type: tokenType
  }

  const handleSubmit = async () => {
    axios({
        url:'/token/',
        data:data,
        method:"POST",
        mode: 'no-cors',
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.REACT_APP_API_URL,
            "Access-Control-Request-Headers": 'Content-Type, Authorization'

        }
    })
    .then(res => {
        console.log(res);
    })
    .catch(err =>{
        console.log(err);
    })
  }

  return (
    <Container
      sx={{
        height: 800,
        width: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ height: 500, width: 1200 }}>
        <Stack spacing={5}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Prioridade do Token
            </InputLabel>
            <Select
              sx={{ marginTop: 5 }}
              label="Prioridade do Token"
              value={tokenType}
              onChange={handleChange}
            >
              <MenuItem value="SP">Prioritário</MenuItem>
              <MenuItem value="SG">Comum</MenuItem>
              <MenuItem value="SE">Resultados exames</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSubmit}>GERAR TOKEN</Button>
        </Stack>
      </Paper>
    </Container>
  );
};
