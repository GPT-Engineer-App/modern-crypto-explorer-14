import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
import { exchangeUrls } from "../../data/ExchangeUrls";

const ExchangeTable = ({ cryptoId }) => {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${cryptoId}/markets`);
        const data = await response.json();
        setExchanges(data.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching exchanges:", error);
      }
    };

    fetchExchanges();
  }, [cryptoId]);

  return (
    <Box overflowX="auto" maxWidth="100%" mt={8}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Exchange</Th>
            <Th>% Total Volume</Th>
            <Th>24h Volume (USD)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {exchanges.map((exchange, index) => (
            <Tr key={exchange.exchangeId}>
              <Td>{index + 1}</Td>
              <Td>
                <Link href={exchangeUrls[exchange.exchangeId]} isExternal>
                  {exchange.exchangeId}
                </Link>
              </Td>
              <Td>{parseFloat(exchange.percentTotalVolume).toFixed(2)}%</Td>
              <Td>${parseFloat(exchange.volumeUsd24Hr).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExchangeTable;
