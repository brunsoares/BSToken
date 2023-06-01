import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from '@dfinity/auth-client';

function Transfer() {

  const [toAccount, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [feedbackTransfer, setFeedback] = useState("");
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    if(toAccount != "" && amount != ""){
      setHidden(true);
      setDisabled(true);
      const result = await token.transfer(Principal.fromText(toAccount), Number(amount));
      setFeedback(result);
      setDisabled(false);
      setHidden(false);
    }
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={toAccount}
                onChange={(e) => setAccount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p>{feedbackTransfer}</p>
      </div>
    </div>
  );
}

export default Transfer;
