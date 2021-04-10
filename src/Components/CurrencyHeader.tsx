import React from "react";
import { useTypedSelector } from "../redux/reduxStore";
import { CurrencyType } from "../types/index_d";
import { combineStyles } from "../utils/helpers";
import classes from "./CurrencyHeader.module.css";

type PropsType = {
	className: string;
	currencyType: CurrencyType;
};

type BankPropsType = {
	href: string;
	time: string;
	alt: string;
	image: string;
};

const Bank = ({ href, alt, time, image }: BankPropsType) => {
	return (
		<div className={classes.block}>
			<a href={href} target="_blank" rel="noreferrer">
				<img className={classes.image} src={image} alt={alt} />
			</a>
			<span className={classes.time}>Станом на {time}</span>
			<a
				className={classes.link}
				href={href}
				rel="noreferrer"
				target="_blank">
				{alt}
			</a>
		</div>
	);
};

const CurrencyHeader = ({ className, currencyType }: PropsType) => {
	const banks = useTypedSelector(
		(state) =>
			state.currency.banksOrder[
				window.innerWidth >= 990 ? CurrencyType.USD : currencyType
			].banks
	);

	return (
		<div className={className}>
			<div className={combineStyles(classes.wrapper, className)}>
				{banks.map((bank) => {
					return (
						<Bank
							key={bank.alt}
							href={bank.href}
							alt={bank.alt}
							time={bank.time}
							image={bank.image}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CurrencyHeader;
