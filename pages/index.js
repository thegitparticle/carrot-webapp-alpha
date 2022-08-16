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
import {
	createDefaultAuthorizationResultCache,
	SolanaMobileWalletAdapter,
} from "@solana-mobile/wallet-adapter-mobile";
require("@solana/wallet-adapter-react-ui/styles.css");

export default function Home() {
	// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
	// const network = WalletAdapterNetwork.Devnet;

	// // You can also provide a custom RPC endpoint.
	// const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	// const wallets = useMemo(
	// 	() => [
	// 		/**
	// 		 * Select the wallets you wish to support, by instantiating wallet adapters here.
	// 		 *
	// 		 * Common adapters can be found in the npm package `@solana/wallet-adapter-wallets`.
	// 		 * That package supports tree shaking and lazy loading -- only the wallets you import
	// 		 * will be compiled into your application, and only the dependencies of wallets that
	// 		 * your users connect to will be loaded.
	// 		 */
	// 		new PhantomWalletAdapter(),
	// 	],
	// 	[]
	// );

	return (
		<div className={styles.container}>
			<Head>
				<title>Carrot - Solana Pay Loyalty</title>
				<meta
					name="description"
					content="Get loyalty points, NFTs from top brands by paying with Solana Pay."
				/>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100;200;300;500;600;700;800;900&display=swap"
					rel="stylesheet"
				></link>
			</Head>

			<main className="flex flex-1 bg-layout-900 justify-center items-center flex-col">
				{/* <ConnectionProvider endpoint={endpoint}>
					<WalletProvider wallets={wallets} autoConnect>
						<WalletModalProvider> */}
				<HomePage />
				{/* </WalletModalProvider>
					</WalletProvider>
				</ConnectionProvider> */}
			</main>

			{/* <footer className="flex items-center justify-center w-full h-20 border-t border-white/20">
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span className={styles.logo}>
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</span>
				</a> */}
			{/* </footer> */}
		</div>
	);
}
