import {useEffect} from "react";
import {useState} from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import CurrencyDropdown from "./dropdown";
import { arrowLeftRight } from "../../utils/Icons";
import { rupiah } from "../../utils/rupiahFormat"
import { InnerLayout } from "../../styles/Layouts";
import Chart from '../Chart/ExchangeRateChart';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IDR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["IDR", "EUR"]
  );

  // Currencies -> https://api.frankfurter.app/currencies
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  console.log(currencies);

  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      if (toCurrency == "IDR") {
        setConvertedAmount(rupiah(data.rates[toCurrency]) + " ");
      } else {
        setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
      }
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <ConvertorStyled>
    <InnerLayout>
    <h1>Currency Converter</h1>
      <div className="wrapper">

        <div className="currDropdown">
          <CurrencyDropdown
            favorites={favorites}
            currencies={currencies}
            title="From:"
            currency={fromCurrency}
            setCurrency={setFromCurrency}
            handleFavorite={handleFavorite}
          />
          {/* swap currency button */}
          <div className="swapCurrButton">
            <Button
              icon={arrowLeftRight}
              onClick={swapCurrencies}
              bPad={'.8rem'}
              bRad={'30px'}
              bg={'var(--color-accent'}
              color={'#fff'}
            >
            </Button>
          </div>
          <CurrencyDropdown
            favorites={favorites}
            currencies={currencies}
            currency={toCurrency}
            setCurrency={setToCurrency}
            title="To:"
            handleFavorite={handleFavorite}
          />

        <div className="amount">
          <label htmlFor="amount">Amount:</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </div>

        <div className="convertButton">
          <button onClick={convertCurrency}>Convert</button>
        </div>

        {convertedAmount && (
          <div className="convertedAmount">
            Converted Amount: {convertedAmount}
          </div>
        )}
        </div>
        <div className="chart-con">
          <Chart />
        </div>
      </div>
      </InnerLayout>

    </ConvertorStyled>
  );
};

const ConvertorStyled = styled.div`
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(100px, auto); 
  }

  .currDropdown {
    align-items: center;
    gap: 1rem;
    margin: 20px;
    margin-bottom: 1rem;
  }

  .swapCurrButton {
    display: flex;
    justify-content: center;
  }

  label {
    font-size: 1rem;
    font-weight: bold;
    display: block;
    margin-left: 8px;
    margin-bottom: 0.5rem;
  }

  .amount {
    margin-top: 50px;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 235px;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .convertButton button {
    padding: 0.5rem 1rem;
    background-color: var(--color-accent);
    color: #fff;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 15px;
  }

  .convertButton button:hover {
    background-color: #333;
  }

  .convertedAmount {
    margin-top: 1rem;
    font-weight: bold;
  }

  .chart-con {
      margin: 15px;
      margin-top: 50px;
      width: 820px;
      height: 500px;
  }
`

export default CurrencyConverter;