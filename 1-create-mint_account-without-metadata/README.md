# Token Launchpad (Without Metadata)

A decentralized application (dApp) built on the Solana blockchain that allows users to create new tokens with just a click of a button.

## Features

- Simple one-click token creation
- Automatic mint account creation using the connected wallet's keypair
- Seamless integration with Solana wallets
- User-friendly interface

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- A Solana wallet (e.g., Phantom, Backpack)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/rohan492/token-launchpad.git
   cd token-launchpad/1-create-mint_account-without-metadata
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the development server:

```
npm run dev
```

This will start the application on `http://localhost:5173` (or another port if 5173 is already in use).

To build the application for production:

```
npm run build
```

## Dependencies

This project uses the following main dependencies:

- React: A JavaScript library for building user interfaces
- Vite: A build tool that aims to provide a faster and leaner development experience
- @solana/web3.js: Solana's JavaScript API
- @solana/spl-token: Solana Program Library token management
- @solana/wallet-adapter-\*: Wallet adapter for Solana dApps

For a full list of dependencies, please refer to the `package.json` file.
