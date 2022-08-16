import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

function LandingPage() {
	function Header() {
		return (
			<div className="flex sticky top-0 z-40 w-full flex-row transition-colors duration-500 items-center justify-between">
				<div className="flex my-4 mx-10 sm:mx-20 w-1/6 justify-start">
					<Link href="mailto:san@blackspace.cool">
						<a>
							<p className="text-neutral-100 font-display text-xs sm:text-sm">
								CONTACT
							</p>
						</a>
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

	return (
		<div className="flex w-screen flex-col h-full justify-center items-center">
			<div className="absolute inset-0 bg-background shadow-lg backdrop-blur w-screen h-screen flex-col justify-center items-center" />
			<div className="absolute inset-0 flex flex-col snap-y snap-mandatory w-full h-screen overflow-y-scroll">
				<Header />
			</div>
		</div>
	);
}

export default LandingPage;
