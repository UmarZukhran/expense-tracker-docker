/* eslint-disable react/prop-types */
import {outlineStar, star} from "../../utils/Icons";
import styled from "styled-components";


const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) => {
  const isFavorite = (curr) => favorites.includes(curr);

  return (
    <CurrencyDropdownStyled>
    <div className="currency__dropdown">
      <label
        htmlFor={title}
      >
        {title}
      </label>

      <div className="select">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {favorites.map((currency) => {
            return (
              <option value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
          <hr />
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>
      </div>
    </div>
    </CurrencyDropdownStyled>
  );
};

const CurrencyDropdownStyled = styled.div`
  .currency__dropdown {
    margin-bottom: 1rem;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  .select select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .select button {
    padding: 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  .select button:hover {
    color: gold;
  }
`;

export default CurrencyDropdown;