import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React from "react";

const TokenLaunchpad = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const createToken = async () => {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const keypair = Keypair.generate();

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(
        keypair.publicKey,
        6,
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    const recentBlockHash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = recentBlockHash.blockhash;
    transaction.feePayer = wallet.publicKey;

    transaction.partialSign(keypair);
    let response = await wallet.sendTransaction(transaction, connection);
    console.log(response);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-[80vh]">
      <h1>Solana Token Launchpad</h1>
      <input
        className="p-2 border border-white"
        type="text"
        placeholder="Name"
        id="name"
      />
      <input
        className="p-2 border border-white"
        type="text"
        placeholder="Symbol"
        id="symbol"
      />
      <input
        className="p-2 border border-white"
        type="text"
        placeholder="Image URL"
        id="imageUrl"
      />
      <input
        className="p-2 border border-white"
        type="text"
        placeholder="Initial Supply"
        id="initialSupply"
      />
      <button onClick={createToken}>Create a Token</button>
    </div>
  );
};

export default TokenLaunchpad;
