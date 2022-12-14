import "../styles/globals.css";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HomePage from "./HomePage";
import React, { useMemo } from "react";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
	CoinbaseWalletAdapter,
	GlowWalletAdapter,
	PhantomWalletAdapter,
	SlopeWalletAdapter,
	SolflareWalletAdapter,
	SolletExtensionWalletAdapter,
	SolletWalletAdapter,
	TorusWalletAdapter,
	TokenaryWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
	WalletModalProvider,
	WalletDisconnectButton,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");

function MyApp({ Component, pageProps }) {
	// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
	const network = WalletAdapterNetwork.Devnet;

	// You can also provide a custom RPC endpoint.
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	const wallets = useMemo(
		() => [
			/**
			 * Select the wallets you wish to support, by instantiating wallet adapters here.
			 *
			 * Common adapters can be found in the npm package `@solana/wallet-adapter-wallets`.
			 * That package supports tree shaking and lazy loading -- only the wallets you import
			 * will be compiled into your application, and only the dependencies of wallets that
			 * your users connect to will be loaded.
			 */
			new PhantomWalletAdapter(),
		],
		[]
	);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<Component {...pageProps} />
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}

export default MyApp;
