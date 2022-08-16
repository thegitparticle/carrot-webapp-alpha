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
import { useInput } from "./utils/useInput";
import Link from "next/link";
import Image from "next/image";

/* create an account  */
const baseAccount = Keypair.generate();
const opts = {
	preflightCommitment: "processed",
};
const programID = new PublicKey(idl.metadata.address);

function DashboardPage() {
	const { connection } = useConnection();
	const { publicKey, sendTransaction, connected } = useWallet();
	const anchorWallet = useAnchorWallet();
	const [userAccountDetails, setUserAccountDetails] = useState(null);

	function WalletStatusRenderComponent() {
		if (connected) {
			return (
				<div className="flex justify-center items-center flex-row h-fit">
					<WalletDisconnectButton />
				</div>
			);
		} else {
			return <WalletMultiButton />;
		}
	}

	function Header() {
		return (
			<div className="flex sticky top-0 z-40 w-full flex-row duration-500 items-center justify-between">
				<div className="flex my-4 mx-10 sm:mx-20 w-1/6 justify-start">
					<Link href="/">
						<Image src="/carrot.png" width={50} height={50} />
					</Link>
				</div>
				<div
					className="flex my-4 mx-10 sm:mx-20 w-1/6 justify-end cursor-pointer"
					onClick={() => setOpened(true)}
				>
					<WalletStatusRenderComponent />
				</div>
			</div>
		);
	}

	function ConsumerDetailsBlock() {
		let addressLength = String(publicKey).length;
		let reducedWalletAddressString =
			String(publicKey).substring(0, 3) +
			"..." +
			String(publicKey).substring(addressLength - 3, addressLength);

		return (
			<div className="flex flex-col w-full h-fit border-b-0 border-b-teal-400/50 px-20 py-20">
				<p className="text-orange-400 font-display font-medium text-2xl">
					Hi, {reducedWalletAddressString}
				</p>
				<p className="text-layout-100/50 font-display font-medium text-base">
					this is your Carrot dashboard. you can check your loyalty
					scores for the brands you shopped with and mint their
					respective NFTs.
				</p>
			</div>
		);
	}

	const [loyaltyAccounts, setLoyaltyAccounts] = useState([]);

	async function getConsumerActivity() {
		try {
			const provider = new AnchorProvider(connection, anchorWallet, {
				preflightCommitment: "processed",
			});
			const program = new Program(idl, programID, provider);

			let list = await program.account.loyalty.all();
			console.log(list);
			setLoyaltyAccounts(list);
			console.log(loyaltyAccounts.length);
		} catch (error) {
			console.log("Error creating initializing new user:", error);
		}
	}

	useEffect(() => {
		if (connected) {
			getConsumerActivity();
		}
	}, [connected]);

	function ConsumerActivity() {
		if (loyaltyAccounts && loyaltyAccounts.length > 0) {
			return (
				<div className="flex flex-col w-5/6 h-fit px-20 py-20 bg-layout-700 rounded-2xl">
					<p className="text-layout-100/80 font-display font-medium text-base">
						loyaltyAccounts exist
					</p>
				</div>
			);
		} else {
			return (
				<div className="flex flex-col w-5/6 h-fit py-20 items-center bg-layout-700 rounded-2xl">
					<p className="text-layout-100 font-display font-medium text-base my-4">
						Seems like you have never paid to any of Carrot's brand
						partners using Solana Pay.
					</p>
					<p className="text-layout-100 font-display font-medium text-base my-4">
						Use Solana Pay and come back here to see your NFTs ready
						to mint. Remember! the more you shop, the higher levels
						of loyalty you reach!
					</p>
					<Link href="/">
						<Image src="/solpay.png" width={135} height={50} />
					</Link>
				</div>
			);
		}
	}

	return (
		<div className="flex w-screen flex-col h-full justify-center items-center">
			<div className="absolute inset-0 shadow-lg backdrop-blur w-screen h-screen flex-col justify-center items-center" />
			<div className="absolute inset-0 flex flex-col snap-y snap-mandatory w-full h-screen overflow-y-scroll items-center">
				<Header />
				<ConsumerDetailsBlock />
				<ConsumerActivity />
			</div>
		</div>
	);
}

export default DashboardPage;
