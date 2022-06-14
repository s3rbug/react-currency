import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { changeSortIcon, resetIcons, sortCurrency } from "../redux/actions/currency";
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
	const isMobile = useMediaQuery({
		query: "(max-width: 990px)"
	})
	const iconStyles = {
		default: combineStyles(classes.bottom, classes.top),
		top: classes.top,
		bottom: classes.bottom,
	};
	const sortType = useTypedSelector(state => isMobile ? 
					state.currency.sortIconsMobile[currencyType] :
					state.currency.sortIcons[currencyType])
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
					dispatch(changeSortIcon(currencyType, TradeType.Buy, isMobile))
					dispatch(sortCurrency(currencyType, TradeType.Buy, isMobile));
				}}>
				<span className={icon(sortType.buy)}>Купівля</span>
			</div>
			<div
				onClick={() => {
					dispatch(changeSortIcon(currencyType, TradeType.Sell, isMobile))
					dispatch(sortCurrency(currencyType, TradeType.Sell, isMobile));
				}}>
				<span className={icon(sortType.sell)}>Продаж</span>
			</div>
		</div>
	);
};

export default Sort;
