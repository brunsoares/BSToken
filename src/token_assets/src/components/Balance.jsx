import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";

function Balance() {

  const [idBalance, setIdBalance] = useState("");
  const [balanceResult, setBalanceResult] = useState("");
  const [symbolToken, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    if(idBalance != ""){
      const result = await token.checkBalance(Principal.fromText(idBalance));
      const symbol = await token.checkSymbol();
      setBalanceResult(result.toLocaleString());
      setSymbol(symbol);
      setHidden(false);
    }
  }

  function changeIdBalance(event){
    const {value} = event.target;
    setIdBalance(value);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={idBalance}
          onChange={changeIdBalance}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {symbolToken}.</p>
    </div>
  );
}

export default Balance;
