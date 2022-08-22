import React from "react";
import Link from "next/link";
import Image from "next/image";

function LoyaltyAccount(props) {
	// props.Account is only props needed
	return (
		<div className="flex flex-col w-5/6 h-fit px-20 py-20 bg-layout-700 rounded-2xl">
			<Image
				src={"/" + props.Account.account.brandName + ".png"}
				width={100}
				height={100}
				objectFit="cover"
			/>
			<p className="text-layout-100/80 font-display font-medium text-base">
				{props.Account.account.brandName}
			</p>
			<p className="text-layout-100/80 font-display font-medium text-base">
				{String(props.Account.account.loyaltyScore.toNumber())}
			</p>
			<p className="text-layout-100/80 font-display font-medium text-base">
				{String(props.Account.account.loyaltyLevel.toNumber())}
			</p>
			<p className="text-layout-100/80 font-display font-medium text-base">
				{String(props.Account.account.mintedLevel.toNumber())}
			</p>
		</div>
	);
}

export default LoyaltyAccount;
