import React, { useCallback, useState } from "react";
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
	const [sortTypeBuy, setSortTypeBuy] = useState(SortEnum.Default)
	const [sortTypeSell, setSortTypeSell] = useState(SortEnum.Default)

	const iconStyles = {
		default: combineStyles(classes.bottom, classes.top),
		top: classes.top,
		bottom: classes.bottom,
	};

	const icon = (sortType: SortEnum) => {
		switch (sortType) {
			case SortEnum.Default:
				return iconStyles.default;
			case SortEnum.Sorted:
				return iconStyles.top;
			case SortEnum.Reversed:
				return iconStyles.bottom;
		}
	} 

	return (
		<div className={combineStyles(classes.wrapper, className)}>
			<div
				onClick={() => {
					if(sortTypeBuy === SortEnum.Reversed){
						setSortTypeBuy(SortEnum.Default)
					}
					else{
						setSortTypeBuy(sortTypeBuy + 1)
					}
					dispatch(sortCurrency(currencyType, TradeType.Buy));
				}}>
				<span className={icon(sortTypeBuy)}>Купівля</span>
			</div>
			<div
				onClick={() => {
					if(sortTypeSell === SortEnum.Reversed){
						setSortTypeSell(SortEnum.Default)
					}
					else{
						setSortTypeSell(sortTypeSell + 1)
					}
					dispatch(sortCurrency(currencyType, TradeType.Sell));
				}}>
				<span className={icon(sortTypeSell)}>Продаж</span>
			</div>
		</div>
	);
};

export default Sort;
