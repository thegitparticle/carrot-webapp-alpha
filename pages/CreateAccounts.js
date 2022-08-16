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
import { Program, AnchorProvider, web3, BN } from "@project-serum/anchor";
import idl from "./utils/idl.json";
import { useInput } from "./utils/useInput";
import Link from "next/link";
import Image from "next/image";
import * as bs58 from "bs58";

/* create an account  */
const baseAccount = Keypair.generate();
const opts = {
	preflightCommitment: "processed",
};
const programID = new PublicKey(idl.metadata.address);

function CreateAccounts() {
	const { connection } = useConnection();
	const { publicKey, sendTransaction, connected } = useWallet();
	const anchorWallet = useAnchorWallet();

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
					<WalletDisconnectButton />
				</div>
			</div>
		);
	}

	function CreateBrandIns() {
		const brandName = useInput("");
		const logoLink = useInput("");
		const level1Link = useInput("");
		const level2Link = useInput("");
		const level3Link = useInput("");

		const createBrandRpc = async () => {
			try {
				const provider = new AnchorProvider(connection, anchorWallet, {
					preflightCommitment: "processed",
				});
				const program = new Program(idl, programID, provider);

				const brand = web3.Keypair.generate();

				await program.rpc.createBrand(
					brandName.value,
					logoLink.value,
					level1Link.value,
					level2Link.value,
					level3Link.value,
					{
						accounts: {
							brand: brand.publicKey,
							brandAddress: publicKey,
							systemProgram: SystemProgram.programId,
						},
						signers: [brand],
					}
				);

				console.log(brand, brand.publicKey);
				const brandAccount = await program.account.brand.fetch(
					brand.publicKey
				);
				console.log(brandAccount);
			} catch (error) {
				console.log("Error adding brand to list:", error);
			}
		};
		return (
			<div className="flex flex-col w-5/6 h-fit py-20 items-center bg-layout-700 rounded-2xl">
				<input {...brandName} placeholder="type brand name" />
				<input {...logoLink} placeholder="type logo Link" />
				<input {...level1Link} placeholder="type level1 link" />
				<input {...level2Link} placeholder="type level2 link" />
				<input {...level3Link} placeholder="type level3 link" />
				<button
					onClick={() => createBrandRpc()}
					className="py-4 px-6 bg-green-500 text-lg text-white"
				>
					create new brand account
				</button>
			</div>
		);
	}

	function CreateLoyaltyIns() {
		const brandAddress = useInput("");
		const brandName = useInput("");
		const loyaltyScore = useInput("");
		const loyaltyLevel = useInput("");
		const mintedLevel = useInput("");

		const createLoyaltyRpc = async () => {
			try {
				const provider = new AnchorProvider(connection, anchorWallet, {
					preflightCommitment: "processed",
				});
				const program = new Program(idl, programID, provider);

				const loyalty = web3.Keypair.generate();

				let score = new BN(Number(loyaltyScore.value));
				let level = new BN(Number(loyaltyLevel.value));
				let minted = new BN(Number(mintedLevel.value));

				let brandPublicKey = new PublicKey(brandAddress.value);

				await program.rpc.createLoyalty(
					brandPublicKey,
					brandName.value,
					score,
					level,
					minted,
					{
						accounts: {
							loyalty: loyalty.publicKey,
							consumerAddress: publicKey,
							systemProgram: SystemProgram.programId,
						},
						signers: [loyalty],
					}
				);
				const loyaltyAccount = await program.account.loyalty.fetch(
					loyalty.publicKey
				);

				console.log(loyaltyAccount);
			} catch (error) {
				console.log("Error adding new loyalty account:", error);
			}
		};
		return (
			<div className="flex flex-col w-5/6 h-fit py-20 items-center bg-layout-700 rounded-2xl">
				<input {...brandName} placeholder="type brand name" />
				<input {...brandAddress} placeholder="type brand address" />
				<input {...loyaltyScore} placeholder="type loyalty score" />
				<input {...loyaltyLevel} placeholder="type loyalty level" />
				<input {...mintedLevel} placeholder="type minted level" />
				<button
					onClick={() => createLoyaltyRpc()}
					className="py-4 px-6 bg-green-500 text-lg text-white"
				>
					create new loyalty account
				</button>
			</div>
		);
	}

	return (
		<div className="flex w-screen flex-col h-full justify-center items-center bg-black">
			<div className="absolute inset-0 shadow-lg backdrop-blur w-screen h-screen flex-col justify-center items-center" />
			<div className="absolute inset-0 flex flex-col snap-y snap-mandatory w-full h-screen overflow-y-scroll items-center">
				<Header />
				<CreateBrandIns />
				<CreateLoyaltyIns />
			</div>
		</div>
	);
}

export default CreateAccounts;
