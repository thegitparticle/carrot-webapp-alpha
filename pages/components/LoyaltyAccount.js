import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function LoyaltyAccount(props) {
	// props.Account is only props needed

	const [brandLogo, setBrandLogo] = useState("");
	const [nftDisplay, setNFTDisplay] = useState("");

	function BrandDetails() {
		return (
			<div className="flex flex-row mx-6 my-6 items-center">
				<div className="flex rounded-full w-24 h-24 relative">
					<Image src={"/supremetest.png"} layout="fill" />
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
				<Image src={"/nftcards90_2.png"} width={299} height={350} />
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
