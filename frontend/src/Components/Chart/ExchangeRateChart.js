import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import axios from 'axios';

const currencies = ['USD', 'EUR', 'JPY', 'IDR']; 

function Chart() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); 
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${selectedCurrency}`);
        const data = response.data.rates;
        const exchangeRatesData = Object.keys(data).map((currency) => ({
          currency,
          rate: data[currency],
        }));
        setExchangeRates(exchangeRatesData);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, [selectedCurrency]); // fetch data whenever selectedCurrency changes

  // extract labels (currency names) and data (exchange rates) from the fetched data
  const labels = exchangeRates.map((exchangeRate) => exchangeRate.currency);
  const data = exchangeRates.map((exchangeRate) => exchangeRate.rate);

  // chart.js data configuration
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Exchange Rates (1 ${selectedCurrency} = ?)`,
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <ChartStyled>
      <CurrencyDropdown value={selectedCurrency} onChange={handleCurrencyChange}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </CurrencyDropdown>
      <Line data={chartData} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #efdfd1;
  border: 2px solid #efdfd1;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

const CurrencyDropdown = styled.select`
  margin-bottom: 1rem;
`;

export default Chart;
