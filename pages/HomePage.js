import React, { useState, useCallback, useEffect } from "react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
	useAnchorWallet,
	useConnection,
	useWallet,
} from "@solana/wallet-adapter-react";
import {
	Keypair,
	SystemProgram,
	Transaction,
	PublicKey,
} from "@solana/web3.js";
import {
	WalletModalProvider,
	WalletDisconnectButton,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import idl from "./utils/idl.json";
import { useInput } from "./utils/useHook";
import DashboardPage from "./DashboardPage";
import LandingPage from "./LandingPage";

function HomePage() {
	const { connected } = useWallet();

	function WalletStatusRenderComponent() {
		if (connected) {
			return <DashboardPage />;
		} else {
			return <LandingPage />;
		}
	}

	return (
		<div className="flex flex-1 flex-col items-center">
			<WalletStatusRenderComponent />
		</div>
	);
}

export default HomePage;
