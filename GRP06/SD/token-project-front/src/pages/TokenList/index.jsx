import {
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

export const TokenList = () => {
  const [rows, setRows] = useState([]);

  const getData = async () => {
    axios({
      url: '/token/',
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL,
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
    })
      .then(res => {
        setRows(res.data);
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
  return (
    <Container>
      <Stack sx={{ width: '100%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption>Quantitativo geral dos tokens emitidos.</caption>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">PRIORIDADE</TableCell>
                <TableCell align="right">DATA</TableCell>
                <TableCell align="right">ATENDIDO</TableCell>
                <TableCell align="right">NUM</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.token_type}</TableCell>
                  <TableCell align="right">{row.token_date}</TableCell>
                  <TableCell align="right">
                    {row.token_finished === true ? 'ATENDIDO' : 'NÃO ATENDIDO'}
                  </TableCell>
                  <TableCell align="right">{row.token_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};
