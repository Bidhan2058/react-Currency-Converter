import React from "react";

function OneResult({ fromCurrency, toCurrency, setOneExchange }) {
  return (
    <>
      <div>1 {fromCurrency} equals</div>
      <div className="mb-5 mt-2 text-4xl front-bold">
        {setOneExchange} {toCurrency}
      </div>
    </>
  );
}

export default OneResult;
