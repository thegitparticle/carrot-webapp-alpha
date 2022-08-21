import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import Image from "next/image";
require("@solana/wallet-adapter-react-ui/styles.css");

function LandingPage() {
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
					<WalletMultiButton />
				</div>
			</div>
		);
	}

	function CenterProductIntro() {
		return (
			<div className="flex w-full sm:h-screen flex-col-reverse sm:flex-row justify-center items-center snap-start">
				<div className="flex w-5/6 h-4/6 sm:h-screen relative flex-col items-center justify-center mt-4 mb-32 sm:mt-0 sm:mb-0">
					<div className="flex my-4">
						<Image
							src="/Carrot_logo_themed.svg"
							width={228}
							height={89}
							objectFit="fixed"
						/>
					</div>
					<p className="text-layout-100 font-display font-bold text-xl flex-row flex my-4">
						Earn
						<p className="text-carrot_orange-500 font-black">
							&nbsp; loyalty score NFTs &nbsp;
						</p>
						automatically from your fav brands!
					</p>
					<p className="text-layout-100 font-display font-bold text-xl flex-row flex my-4">
						Just pay using Solana Pay & come here to mint them.
					</p>
					<p className="text-layout-100 font-display font-bold text-xl flex-row flex my-4">
						Coming soon to Solana Mainnet.
					</p>
				</div>
				<div className="flex w-5/6 h-screen relative items-center justify-center my-6 sm:my-0 flex-row">
					<div className="flex flex-col items-center">
						<div className="transition ease-in-out delay-150 rotate-10 translate-y-24 hover:translate-y-20 hover:scale-110 hover:rotate-0">
							<Image
								src="/nftcards1.png"
								width={342}
								height={400}
							/>
						</div>
						<div className="transition ease-in-out delay-150 -rotate-8 hover:-translate-y-1 hover:scale-110 hover:rotate-0">
							<Image
								src="/nftcards2.png"
								width={342}
								height={400}
							/>
						</div>
					</div>
					<div className="transition ease-in-out delay-150 -rotate-24 -translate-x-24 hover:-translate-y-1 hover:scale-110 hover:rotate-0">
						<Image src="/nftcards3.png" width={342} height={400} />
					</div>
				</div>
			</div>
		);
	}

	function Footer() {
		return (
			<div className="flex w-full justify-center items-center bg-dark border-t-2 border-layout-300/25 snap-end">
				<p className="text-layout-300 font-display text-xs my-12">
					Carrot - Alpha
				</p>
			</div>
		);
	}

	return (
		<div className="flex w-screen flex-col h-full justify-center items-center">
			<div className="absolute inset-0 shadow-lg backdrop-blur w-screen h-screen flex-col justify-center items-center" />
			<div className="absolute inset-0 flex flex-col snap-y snap-mandatory w-full h-screen overflow-y-scroll">
				<Header />
				<CenterProductIntro />
				<Footer />
			</div>
		</div>
	);
}

export default LandingPage;
