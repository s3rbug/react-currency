import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { changeSortIcon, sortCurrency } from "../redux/actions/currency";
import { useTypedSelector } from "../redux/reduxStore";
import { CurrencyType, SortEnum, TradeType } from "../types/index_d";
import classes from "./Sort.module.css";


type PropsType = {
	currencyType: CurrencyType;
	className?: string;
};

const Sort = ({ currencyType, className }: PropsType) => {
	const dispatch = useDispatch();
	const isMobile = useMediaQuery({
		query: "(max-width: 990px)"
	})
	const sortType = useTypedSelector(state => isMobile ? 
					state.currency.sortIconsMobile[currencyType] :
					state.currency.sortIcons[currencyType])
	const iconStyle = (sortType: SortEnum) => {	// Get CSS style for every state of sort
		switch (sortType) {
			case SortEnum.Default:
				return clsx(classes.bottom, classes.top);
			case SortEnum.Sorted:
				return classes.top;
			case SortEnum.Reversed:
				return classes.bottom;
		}
	}
	return (
		<div className={clsx(classes.wrapper, className)}>
			<div
				onClick={() => {
					dispatch(changeSortIcon(currencyType, TradeType.Buy, isMobile))
					dispatch(sortCurrency(currencyType, TradeType.Buy, isMobile));
				}}>
				<span className={iconStyle(sortType.buy)}>Купівля</span>
			</div>
			<div
				onClick={() => {
					dispatch(changeSortIcon(currencyType, TradeType.Sell, isMobile))
					dispatch(sortCurrency(currencyType, TradeType.Sell, isMobile));
				}}>
				<span className={iconStyle(sortType.sell)}>Продаж</span>
			</div>
		</div>
	);
};

export default Sort;
