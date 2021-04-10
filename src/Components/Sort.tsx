import React from "react";
import { useDispatch } from "react-redux";
import { sortCurrency } from "../redux/actions/currency";
import { useTypedSelector } from "../redux/reduxStore";
import { CurrencyType, SortEnum, TradeType } from "../types/index_d";
import { combineStyles } from "../utils/helpers";
import classes from "./Sort.module.css";

type PropsType = {
	currencyType: CurrencyType;
	className?: string;
};

const Sort = ({ currencyType, className }: PropsType) => {
	const dispatch = useDispatch();
	const sortType = useTypedSelector((state) => state.currency.sort.type);
	const sortTradeType = useTypedSelector(
		(state) => state.currency.sort.tradeType
	);
	const sortCurrencyType = useTypedSelector(
		(state) => state.currency.sort.currencyType
	);

	const iconStyles = {
		default: combineStyles(classes.bottom, classes.top),
		top: classes.top,
		bottom: classes.bottom,
	};

	const icon = (type: SortEnum, tradeType: TradeType) => {
		if (tradeType !== sortTradeType || sortCurrencyType !== currencyType)
			return iconStyles.default;
		switch (type) {
			case SortEnum.Default:
				return iconStyles.default;
			case SortEnum.Sorted:
				return iconStyles.top;
			case SortEnum.Reversed:
				return iconStyles.bottom;
		}
	};
	return (
		<div className={combineStyles(classes.wrapper, className)}>
			<div
				onClick={() => {
					dispatch(sortCurrency(currencyType, TradeType.Buy));
				}}>
				<span className={icon(sortType, TradeType.Buy)}>Купівля</span>
			</div>
			<div
				onClick={() => {
					dispatch(sortCurrency(currencyType, TradeType.Sell));
				}}>
				<span className={icon(sortType, TradeType.Sell)}>Продаж</span>
			</div>
		</div>
	);
};

export default Sort;
