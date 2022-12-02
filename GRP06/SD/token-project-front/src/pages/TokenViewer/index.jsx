import {
  Box,
  Button,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const TokenViewer = () => {
  const [tokens, setTokens] = useState([]);
  const [firstToken, setFirstToken] = useState({});

  const handleFinishedToken = async id => {
    axios({
      url: '/token/' + id,
      method: 'PUT',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL,
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
    })
      .then(res => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getData = async () => {
    axios({
      url: '/token/unfinished',
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL,
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
    })
      .then(res => {
        if (res.data === []) {
          setTokens([]);
          setFirstToken([]);
        } else {
          setTokens(res.data);
          setFirstToken(res.data[0]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  return (
    <Container
      sx={{
        alignItems: 'center',
        display: 'flex',
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Box>
          <br />
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            TOKEN DA VEZ
          </Typography>
          <Button onClick={() => handleFinishedToken(firstToken.id)}>
            ATENDER TOKEN
          </Button>
        </Box>
        <br />
        <Divider variant="fullWidth" />
        <Box
          sx={{
            height: 500,
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: 'bold', flexGrow: 1, fontSize: 200 }}
          >
            {firstToken.token_number}
          </Typography>
        </Box>
        <Divider variant="fullWidth" />
        <br />
        <Grid container spacing={4}>
          {tokens.map(
            token =>
              token.id !== firstToken.id && (
                <Grid key={token.id} item xs={2} md={3}>
                  <CardContent
                    sx={{
                      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
                      borderRadius: 5,
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{ flexGrow: 1, fontWeight: 'bold' }}
                    >
                      {bull}
                      {token.token_number}
                      {bull}
                    </Typography>
                    <Divider variant="fullWidth" />
                  </CardContent>
                </Grid>
              )
          )}
        </Grid>
        <br />
      </Stack>
    </Container>
  );
};
