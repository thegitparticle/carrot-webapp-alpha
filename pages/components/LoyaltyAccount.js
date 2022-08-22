import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import idl from "../../utils/idl.json";
import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import {
	useAnchorWallet,
	useConnection,
	useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import * as splToken from "@solana/spl-token";

const programID = new PublicKey(idl.metadata.address);

function LoyaltyAccount(props) {
	// props.Account is only props needed

	const { connection } = useConnection();
	const { publicKey, sendTransaction, connected } = useWallet();
	const anchorWallet = useAnchorWallet();

	const [brandLogo, setBrandLogo] = useState("");
	const [nftDisplay, setNFTDisplay] = useState("");

	async function getBrandDetailsAccount() {
		try {
			const provider = new AnchorProvider(connection, anchorWallet, {
				preflightCommitment: "processed",
			});
			const program = new Program(idl, programID, provider);

			let brand = await program.account.brand.all([
				{
					memcmp: {
						offset: 8,
						bytes: props.Account.account.brandAddress.toBase58(),
					},
				},
			]);
			console.log(brand[0]);
			setBrandLogo(brand[0].account.logoLink);
			if (Number(props.Account.account.loyaltyLevel) === 1) {
				setNFTDisplay(brand[0].account.level1NftLink);
			} else if (Number(props.Account.account.loyaltyLevel) === 1) {
				setNFTDisplay(brand[0].account.level1NftLink);
			} else if (Number(props.Account.account.loyaltyLevel) === 1) {
				setNFTDisplay(brand[0].account.level1NftLink);
			} else {
				setNFTDisplay("");
			}
		} catch (error) {
			console.log("Error creating initializing new user:", error);
		}
	}

	useEffect(() => {
		if (connected) {
			getBrandDetailsAccount();
		}
	}, [connected]);

	function BrandDetails() {
		return (
			<div className="flex flex-row mx-6 my-6 items-center">
				<div className="flex rounded-full w-24 h-24 relative">
					<Image
						src={"https://i.postimg.cc/TP2Lw0F5/Herme-s-svg.png"}
						layout="fill"
					/>
				</div>
				<p className="text-layout-100/80 font-display font-bold text-xl mx-4">
					{props.Account.account.brandName}
				</p>
			</div>
		);
	}

	function LoyaltyDetails() {
		return (
			<div className="flex flex-col mx-6 my-6">
				<div className="flex flex-row">
					<p className="text-layout-100/50 font-display font-medium text-base">
						loyalty Score
					</p>
					<p className="text-layout-100/80 font-display font-bold text-xl mx-4">
						{String(props.Account.account.loyaltyScore.toNumber())}
					</p>
				</div>
				<div className="flex flex-row">
					<p className="text-layout-100/50 font-display font-medium text-base">
						loyalty Level
					</p>
					<p className="text-layout-100/80 font-display font-bold text-xl mx-4">
						{String(props.Account.account.loyaltyLevel.toNumber())}
					</p>
				</div>
			</div>
		);
	}

	function MintButton() {
		async function mintFunctionCall() {
			const provider = new AnchorProvider(connection, anchorWallet, {
				preflightCommitment: "processed",
			});

			const program = new Program(idl, programID, provider);

			const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
				"metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
			);

			const lamports =
				await provider.connection.getMinimumBalanceForRentExemption(
					splToken.MINT_SIZE
				);

			const getMetadata = async (mint) => {
				return (
					await web3.PublicKey.findProgramAddress(
						[
							Buffer.from("metadata"),
							TOKEN_METADATA_PROGRAM_ID.toBuffer(),
							mint.toBuffer(),
						],
						TOKEN_METADATA_PROGRAM_ID
					)
				)[0];
			};

			const getMasterEdition = async (mint) => {
				return (
					await web3.PublicKey.findProgramAddress(
						[
							Buffer.from("metadata"),
							TOKEN_METADATA_PROGRAM_ID.toBuffer(),
							mint.toBuffer(),
							Buffer.from("edition"),
						],
						TOKEN_METADATA_PROGRAM_ID
					)
				)[0];
			};

			const mintKey = web3.Keypair.generate();
			const NftTokenAccount = await splToken.getAssociatedTokenAddress(
				mintKey.publicKey,
				publicKey
			);
			console.log("NFT Account: ", NftTokenAccount.toBase58());

			const mint_tx = new web3.Transaction().add(
				web3.SystemProgram.createAccount({
					fromPubkey: publicKey,
					newAccountPubkey: mintKey.publicKey,
					space: splToken.MINT_SIZE,
					programId: splToken.TOKEN_PROGRAM_ID,
					lamports,
				}),
				splToken.createInitializeMintInstruction(
					mintKey.publicKey,
					0,
					publicKey,
					publicKey
				),
				splToken.createAssociatedTokenAccountInstruction(
					publicKey,
					NftTokenAccount,
					publicKey,
					mintKey.publicKey
				)
			);

			console.log("mint txn setup");

			const res = await provider.sendAndConfirm(mint_tx, [
				mintKey,
				// consumer,
			]);
			console.log(
				await provider.connection.getParsedAccountInfo(
					mintKey.publicKey
				)
			);

			console.log("Account: ", res);
			console.log("Mint key: ", mintKey.publicKey.toString());
			console.log("User: ", publicKey.toString());

			const metadataAddress = await getMetadata(mintKey.publicKey);
			const masterEdition = await getMasterEdition(mintKey.publicKey);

			console.log("Metadata address: ", metadataAddress.toBase58());
			console.log("MasterEdition: ", masterEdition.toBase58());

			const mintTx = await program.rpc.mintNft(
				mintKey.publicKey,
				String(nftDisplay),
				// "https://jsonkeeper.com/b/52JF",
				`${props.Account.account.brandName} #${String(
					props.Account.account.loyaltyLevel
				)}`,
				{
					accounts: {
						mintAuthority: publicKey,
						mint: mintKey.publicKey,
						tokenAccount: NftTokenAccount,
						tokenProgram: splToken.TOKEN_PROGRAM_ID,
						metadata: metadataAddress,
						tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
						payer: publicKey,
						systemProgram: web3.SystemProgram.programId,
						rent: web3.SYSVAR_RENT_PUBKEY,
						masterEdition: masterEdition,
					},
				}
			);

			console.log("Your transaction signature:", mintTx);
		}

		if (
			Number(props.Account.account.loyaltyLevel) !==
			Number(props.Account.account.mintedLevel)
		) {
			return (
				<div className="my-6">
					<button
						onClick={mintFunctionCall}
						className="bg-carrot_green-500 py-4 px-8 rounded-md text-layout-100 font-semibold font-display"
					>
						Mint Level
					</button>
				</div>
			);
		} else {
			return (
				<div className="my-6">
					<button
						onClick={mintFunctionCall}
						// disabled
						className="bg-carrot_green-500/25 py-4 px-8 rounded-md text-layout-100 font-semibold font-display"
					>
						Already Minted
					</button>
				</div>
			);
		}
	}

	function CurrentNFTEligibleImage() {
		return (
			<div className="flex scale-150 skew-y-6">
				<Image
					src={"https://i.postimg.cc/kMVBHBW8/hermes-1.png"}
					width={299}
					height={350}
				/>
			</div>
		);
	}

	return (
		<div className="flex flex-row justify-between w-4/6 my-32 bg-layout-700 rounded-2xl">
			<div className="flex flex-col w-3/6 items-center justify-between">
				<BrandDetails />
				<LoyaltyDetails />
				<MintButton />
			</div>
			<CurrentNFTEligibleImage />
		</div>
	);
}

LoyaltyAccount.getInitialProps = async (ctx) => {
	const dummyLoyaltyAccount = {
		brandName: "",
		loyaltyLevel: "",
		loyaltyScore: "",
		mintedLevel: "",
		brandAddress: "",
	};
	return { Account: dummyLoyaltyAccount };
};

export default LoyaltyAccount;
