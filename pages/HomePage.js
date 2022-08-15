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

/* create an account  */
const baseAccount = Keypair.generate();
const opts = {
	preflightCommitment: "processed",
};
const programID = new PublicKey(idl.metadata.address);

function HomePage() {
	const { connection } = useConnection();
	const { publicKey, sendTransaction, connected } = useWallet();
	const anchorWallet = useAnchorWallet();
	const [userAccountDetails, setUserAccountDetails] = useState(null);

	function WalletStatusRenderComponent() {
		if (connected) {
			return (
				<div className="flex justify-center items-center flex-row h-fit py-10">
					<p className="text-sm text-white/70 px-4">
						{String(publicKey)}
					</p>
					<WalletDisconnectButton />
				</div>
			);
		} else {
			return <WalletMultiButton />;
		}
	}

	function InitializeNewUserButton() {
		const initializeSolProgram = async () => {
			try {
				const provider = new AnchorProvider(connection, anchorWallet, {
					preflightCommitment: "processed",
				});
				const program = new Program(idl, programID, provider);

				const [listAccount, bump] =
					await web3.PublicKey.findProgramAddress(
						["brandslist", publicKey.toBytes()],
						programID
					);

				let nameHere = String(publicKey);

				let list = await program.account.brandsList.fetch(listAccount);
				console.log(list);
				setUserAccountDetails(list);

				// await program.rpc.initialize(nameHere, false, bump, {
				// 	accounts: {
				// 		list: listAccount,
				// 		user: publicKey,
				// 		systemProgram: SystemProgram.programId,
				// 	},
				// });

				// console.log("initializing new user - done!");

				// let list = await program.account.brandsList.fetch(listAccount);
				// setUserAccountDetails(list);
				// console.log(list);
			} catch (error) {
				console.log("Error creating initializing new user:", error);
			}
		};

		return (
			<div className="flex items-center justify-center h-fit">
				<button
					onClick={() => initializeSolProgram()}
					className="py-4 px-6 bg-green-500 text-lg text-white"
				>
					initialize new user
				</button>
			</div>
		);
	}

	function AddNewBrand() {
		const brandName = useInput("");
		const loyaltyScore = useInput("");
		const loyaltyLevel = useInput("");

		const addNewBrandSolProgram = async () => {
			try {
				const provider = new AnchorProvider(connection, anchorWallet, {
					preflightCommitment: "processed",
				});
				const program = new Program(idl, programID, provider);

				const [itemAccount] = await web3.PublicKey.findProgramAddress(
					["branditem", publicKey.toBytes(), brandName.value],
					programID
				);

				let list = userAccountDetails;

				// console.log(brandName.value, typeof brandName.value);

				await program.rpc.addBrand(
					brandName.value,
					Number(loyaltyScore.value),
					Number(loyaltyLevel.value),
					{
						accounts: {
							list: list.name,
							listOwner: publicKey,
							item: publicKey,
							user: publicKey,
							systemProgram: SystemProgram.programId,
						},
					}
				);
			} catch (error) {
				console.log("Error adding brand to list:", error);
			}
		};

		return (
			<div className="flex items-center justify-center h-fit">
				<input {...brandName} placeholder="type brand name" />
				<input {...loyaltyScore} placeholder="type loyalty score" />
				<input {...loyaltyLevel} placeholder="type loyalty level" />
				<button
					onClick={() => addNewBrandSolProgram()}
					className="py-4 px-6 bg-green-500 text-lg text-white"
				>
					add new brand
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-1 bg-black flex-col items-center">
			<WalletStatusRenderComponent />
			<p className="text-xl text-cyan-500 py-10">
				Pay using Solana, get rewarded the most!
			</p>
			<InitializeNewUserButton />
			<AddNewBrand />
		</div>
	);
}

export default HomePage;
