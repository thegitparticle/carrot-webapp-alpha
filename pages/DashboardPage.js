import {
	useAnchorWallet,
	useConnection,
	useWallet,
} from "@solana/wallet-adapter-react";
import {
	WalletDisconnectButton,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Keypair, PublicKey } from "@solana/web3.js";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import idl from "../utils/idl.json";
import ConsumerActivity from "./components/ConsumerActivity";
require("@solana/wallet-adapter-react-ui/styles.css");
import dynamic from "next/dynamic";

/* create an account  */
const baseAccount = Keypair.generate();
const opts = {
	preflightCommitment: "processed",
};
const programID = new PublicKey(idl.metadata.address);

const DynamicConsumerActivity = dynamic(
	() => import("./components/ConsumerActivity"),
	{
		ssr: false,
	}
);

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

	return (
		<div className="flex w-screen flex-col h-full justify-center items-center">
			<div className="absolute inset-0 shadow-lg backdrop-blur w-screen h-screen flex-col justify-center items-center" />
			<div className="absolute inset-0 flex flex-col snap-y snap-mandatory w-full h-screen overflow-y-scroll items-center">
				<Header />
				<ConsumerDetailsBlock />
				<DynamicConsumerActivity />
				{/* <Link
					href="/CreateAccounts"
					className="py-4 px-6 bg-green-500 text-lg text-white"
				>
					go to create accounts
				</Link> */}
			</div>
		</div>
	);
}

export default DashboardPage;
