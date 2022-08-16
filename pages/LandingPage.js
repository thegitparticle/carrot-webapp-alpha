import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import Image from "next/image";

function LandingPage() {
	function Header() {
		return (
			<div className="flex sticky top-0 z-40 w-full flex-row transition-colors duration-500 items-center justify-between">
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
			<div className="flex items-center w-full sm:h-screen flex-col">
				<div className="flex flex-row items-center">
					<p className="text-layout-100 font-display font-bold text-7xl mx-20 ">
						A new <p className="text-orange-500">reason</p> to pay
						with
					</p>
					<div className="flex mx-20">
						<Image src="/solpay.png" width={342.5} height={125} />
					</div>
				</div>
				<div className="flex flex-row items-center">
					<div className="">
						<Image src="/nftcard1.png" width={342} height={400} />
					</div>
				</div>
				<div className="flex flex-row items-center">
					<div className="">
						<Image src="/nftcard1.png" width={342} height={400} />
					</div>
				</div>
				<div className="flex flex-row items-center">
					<div className="">
						<Image src="/nftcard1.png" width={342} height={400} />
					</div>
				</div>
			</div>
		);
	}

	function Footer() {
		return (
			<div className="flex w-full justify-center items-center bg-dark snap-end border-t-2 border-light/25">
				<p class="text- font-display text-xs my-12">Carrot - Alpha</p>
			</div>
		);
	}

	return (
		<div className="flex w-screen flex-col h-full justify-center items-center">
			<div className="absolute inset-0 flex flex-col snap-y snap-mandatory w-full h-screen overflow-y-scroll">
				<Header />
				<CenterProductIntro />
			</div>
		</div>
	);
}

export default LandingPage;
