import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from '@dfinity/auth-client';

function Faucet() {

  const [isDisabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Let's go!");

  async function handleClick(event) {
    setDisabled(true);
    /*
      Enviroment: Production
      const authClient = await AuthClient.create();
      const identity = await authClient.getIdentity();
      const authenticatedCanister = createActor(canisterId, {
        agentOptions: {
          identity
        },
      });

      var result = await authenticatedCanister.payOut();
    */

    // Enviroment: Developer
    var result = await token.payOut();
    setTextButton(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free BSTokens here! Claim 10,000 BST coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {textButton}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
