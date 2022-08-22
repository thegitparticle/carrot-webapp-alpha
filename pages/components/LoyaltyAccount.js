import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import idl from "../../utils/idl.json";
import { AnchorProvider, Program } from "@project-serum/anchor";
import {
	useAnchorWallet,
	useConnection,
	useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

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
					<Image src={brandLogo} layout="fill" />
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
		function mintFunctionCall() {
			console.log("mint a new nft");
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
						disabled
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
				<Image src={nftDisplay} width={299} height={350} />
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
