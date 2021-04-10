import React from "react";
import { useTypedSelector } from "../redux/reduxStore";
import { CurrencyType } from "../types/index_d";
import { combineStyles } from "../utils/helpers";
import classes from "./Currency.module.css";

type PropsType = {
	currencyType: CurrencyType;
	className?: string;
};

const Currency = ({ currencyType, className }: PropsType) => {
	const banks = useTypedSelector((state) => {
		return state.currency.banksOrder[
			window.innerWidth >= 990 ? CurrencyType.USD : currencyType
		].banks;
	});
	return (
		<div
			key={currencyType}
			className={combineStyles(classes.wrapper, className)}>
			{banks.map((bank, index) => {
				const key = index.toString() + currencyType.toString();
				switch (currencyType) {
					case CurrencyType.USD: {
						return (
							<React.Fragment key={"usd" + key}>
								<div key={"usd.buy" + key}>
									{bank.currency.usd.buy}
								</div>
								<div key={"usd.sell" + key}>
									{bank.currency.usd.sell}
								</div>
							</React.Fragment>
						);
					}
					case CurrencyType.EUR: {
						return (
							<React.Fragment key={"eur" + key}>
								<div key={"eur.buy" + key}>
									{bank.currency.eur.buy}
								</div>
								<div key={"eur.sell" + key}>
									{bank.currency.eur.sell}
								</div>
							</React.Fragment>
						);
					}
					case CurrencyType.PLN: {
						return (
							<React.Fragment key={"pln" + key}>
								<div key={"pln.buy" + key}>
									{bank.currency.pln.buy}
								</div>
								<div key={"pln.sell" + key}>
									{bank.currency.pln.sell}
								</div>
							</React.Fragment>
						);
					}
					case CurrencyType.GBP: {
						return (
							<React.Fragment key={"gbp" + key}>
								<div key={"gbp.buy" + key}>
									{bank.currency.gbp.buy}
								</div>
								<div key={"gbp.sell" + key}>
									{bank.currency.gbp.sell}
								</div>
							</React.Fragment>
						);
					}
					default: {
						return (
							<React.Fragment
								key={"EMPTY" + currencyType}></React.Fragment>
						);
					}
				}
			})}
		</div>
	);
};

export default Currency;
