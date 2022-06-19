import clsx from "clsx";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useTypedSelector } from "../redux/reduxStore";
import { CurrencyType } from "../types/index_d";
import classes from "./Currency.module.css";

type PropsType = {
	currencyType: CurrencyType;
	className?: string;
};

const Currency = ({ currencyType, className }: PropsType) => {
	const isMobile = useMediaQuery({
		query: "(max-width: 990px)"
	})
	const banksMobile = useTypedSelector((state) => state.currency.mobileBanksOrder[currencyType]);
	const banks = useTypedSelector(state => state.currency.banksOrder)
	const banksToRender = isMobile ? banksMobile : banks
	const formatBuySell = (buy: string | undefined, sell: string | undefined): [string, string] => {
		let note  = buy !== "—" && buy === sell ? "*" : ""
		return [buy + note, sell + note]
	}
	return (
		<div
			key={currencyType}
			className={clsx(classes.wrapper, className)}>
			{banksToRender.map((bank, index) => {
				const key = index.toString() + currencyType.toString();
				switch (currencyType) {
					case CurrencyType.USD: {
						const [buy, sell] = formatBuySell(bank.currency.usd.buy, bank.currency.usd.sell) 
						return (
							<React.Fragment key={"usd" + key}>
								<div key={"usd.buy" + key}>
									{buy}
								</div>
								<div key={"usd.sell" + key}>
									{sell}
								</div>
							</React.Fragment>
						);
					}
					case CurrencyType.EUR: {
						const [buy, sell] = formatBuySell(bank.currency.eur.buy, bank.currency.eur.sell)  
						return (
							<React.Fragment key={"eur" + key}>
								<div key={"eur.buy" + key}>
									{buy}
								</div>
								<div key={"eur.sell" + key}>
									{sell}
								</div>
							</React.Fragment>
						);
					}
					case CurrencyType.PLN: {
						const [buy, sell] = formatBuySell(bank.currency.pln.buy, bank.currency.pln.sell)  
						return (
							<React.Fragment key={"pln" + key}>
								<div key={"pln.buy" + key}>
									{buy}
								</div>
								<div key={"pln.sell" + key}>
									{sell}
								</div>
							</React.Fragment>
						);
					}
					case CurrencyType.GBP: {
						const [buy, sell] = formatBuySell(bank.currency.gbp.buy, bank.currency.gbp.sell) 
						return (
							<React.Fragment key={"gbp" + key}>
								<div key={"gbp.buy" + key}>
									{buy}
								</div>
								<div key={"gbp.sell" + key}>
									{sell}
								</div>
							</React.Fragment>
						);
					}
					default: {
						return null
					}
				}
			})}
		</div>
	);
};

export default Currency;