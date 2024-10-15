import {
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  ExtensionType,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
// import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import * as spl_token_metadata from "@solana/spl-token-metadata";
const { createInitializeInstruction, pack } = spl_token_metadata;
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React from "react";

const TokenLaunchpad = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const createToken = async () => {
    const keypair = Keypair.generate();

    const metadata = {
      mint: keypair.publicKey,
      name: "KIRA",
      symbol: "KIR    ",
      uri: "https://cdn.100xdevs.com/metadata.json",
      additionalMetadata: [],
    };

    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataLen
    );

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        keypair.publicKey,
        wallet.publicKey,
        keypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(
        keypair.publicKey,
        9,
        wallet.publicKey,
        null,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: keypair.publicKey,
        metadata: keypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      })
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
