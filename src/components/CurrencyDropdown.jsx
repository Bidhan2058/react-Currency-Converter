import React from "react";
const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  title = "",
}) => {
  return (
    <div>
      <label htmlFor={title}>{title}</label>
      <div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {currencies.map((c) => {
            return (
              <option key={c} value={c}>
                {c}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
