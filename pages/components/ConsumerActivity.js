import { AnchorProvider, Program } from "@project-serum/anchor";
import {
	useAnchorWallet,
	useConnection,
	useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import idl from "../../utils/idl.json";
import dynamic from "next/dynamic";

const DynamicLoyaltyAccount = dynamic(() => import("./LoyaltyAccount"), {
	ssr: false,
});

const programID = new PublicKey(idl.metadata.address);

function ConsumerActivity() {
	const { connection } = useConnection();
	const { publicKey, sendTransaction, connected } = useWallet();
	const anchorWallet = useAnchorWallet();

	const [loyaltyAccounts, setLoyaltyAccounts] = useState([]);

	async function getConsumerActivity() {
		try {
			const provider = new AnchorProvider(connection, anchorWallet, {
				preflightCommitment: "processed",
			});
			const program = new Program(idl, programID, provider);

			let list = await program.account.loyalty.all([
				{
					memcmp: {
						offset: 8,
						bytes: publicKey.toBase58(),
					},
				},
			]);
			console.log(list);
			setLoyaltyAccounts(list);
		} catch (error) {
			console.log("Error creating initializing new user:", error);
		}
	}

	useEffect(() => {
		if (connected) {
			getConsumerActivity();
		}
	}, [connected]);

	if (loyaltyAccounts && loyaltyAccounts.length > 0) {
		return (
			<div className="flex flex-col items-center w-full justify-center">
				{loyaltyAccounts.map((item) => (
					<DynamicLoyaltyAccount Account={item} />
				))}
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
					Use Solana Pay and come back here to see your NFTs ready to
					mint. Remember! the more you shop, the higher levels of
					loyalty you reach!
				</p>
				<Link href="/">
					<Image src="/solpay.png" width={135} height={50} />
				</Link>
			</div>
		);
	}
}

export default ConsumerActivity;
