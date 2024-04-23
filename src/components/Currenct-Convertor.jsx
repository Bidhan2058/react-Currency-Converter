import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import { IoMdSwap } from "react-icons/io";
import OneResult from "./OneResult";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const CurrenctConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("JPY");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [oneExchange, setOneExchange] = useState(null);
 

  const fetchCurrencies = async () => {
    try {
      const res = await fetch(" https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const oneResult = async () => {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${1}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        console.log(data);

        setOneExchange(data.rates[toCurrency]);
        console.log(setOneExchange);
      } catch (error) {
        console.error("Error Fetching", error);
      }
    };
    oneResult();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const curencyConvert = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      console.log(data);

      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  //
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl front-semibold">Currenct Convertor</h2>
      <div>
        <OneResult
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          setOneExchange={oneExchange}
        />
      </div>
      <div>
        <CurrencyDropdown
          currencies={currencies}
          title="From"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
        />

        <button onClick={handleSwap}>
          <IoMdSwap className="my-4" />
        </button>
        <CurrencyDropdown
          currencies={currencies}
          title="To"
          currency={toCurrency}
          setCurrency={setToCurrency}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={curencyConvert}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${converting ? "animate-bounce" : ""}
          `}
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium  text-right text-green-600">
          Converted Amount:{convertedAmount}
        </div>
      )}
    </div>
  );
};
export default CurrenctConvertor;
