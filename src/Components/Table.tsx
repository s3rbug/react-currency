import clsx from "clsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDate } from "../redux/actions/currency";
import { getCurrency, getCurrencyNBU } from "../redux/middleware/currency";
import { useTypedSelector } from "../redux/reduxStore";
import { CurrencyType, NbuCurrencyType } from "../types/index_d";
import Currency from "./Currency";
import CurrencyHeader from "./CurrencyHeader";
import Sort from "./Sort";
import classes from "./Table.module.css";

type TitleBannerPropsType = {
	currencyType: CurrencyType;
	currencyNBU: NbuCurrencyType;
	highlighted?: boolean;
}

const TitleBanner = ({currencyType, currencyNBU, highlighted}: TitleBannerPropsType) => {
	let valueNBU: string | undefined = ""
	let textNBU: string = ""
	switch(currencyType){
		case CurrencyType.USD:
			valueNBU = currencyNBU.usd
			textNBU = "USD"
			break
		case CurrencyType.EUR:
			valueNBU = currencyNBU.eur
			textNBU = "EUR"
			break
		case CurrencyType.PLN:
			valueNBU = currencyNBU.pln
			textNBU = "PLN"
			break
		case CurrencyType.GBP:
			valueNBU = currencyNBU.gbp
			textNBU = "GBP"
			break
	}
	return (
	<div className={clsx(highlighted && classes.color, classes.block)}>
		<div className={classes.money}>{`${textNBU} `}</div>
		<span className={classes.nbu}>{"НБУ "}</span>
		<span className={classes.nbu_number}>
			{valueNBU}
		</span>
	</div>
	)
}

type BannerPropsType = {
	currencyType: CurrencyType;
	highlighted?: boolean;
}

const Banner = ({currencyType, highlighted}: BannerPropsType) => {
	let sortStyle = "",
		headerStyle = "",
		contentStyle = ""
	switch(currencyType){	// Choose correct style for each currency
		case CurrencyType.USD:
			sortStyle = classes.sort_usd
			headerStyle = classes.header_usd
			contentStyle = classes.content_usd
			break
		case CurrencyType.EUR:
			sortStyle = classes.sort_eur
			headerStyle = classes.header_eur
			contentStyle = classes.content_eur
			break
		case CurrencyType.PLN:
			sortStyle = classes.sort_pln
			headerStyle = classes.header_pln
			contentStyle = classes.content_pln
			break
		case CurrencyType.GBP:
			sortStyle = classes.sort_gbp
			headerStyle = classes.header_gbp
			contentStyle = classes.content_gbp
			break
	}
	return (
		<>
			<Sort
				className={clsx(
					sortStyle,
					highlighted && classes.highlight
				)}
				currencyType={currencyType}
			/>
			<CurrencyHeader
				currencyType={currencyType}
				className={headerStyle}
			/>
			<div className={contentStyle}>
				<Currency
					className={clsx(highlighted && classes.highlight)}
					currencyType={currencyType}
				/>
			</div>
		</>
	)
}

const Table = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setCurrentDate());
		dispatch(getCurrencyNBU());
		dispatch(getCurrency())
	}, [dispatch]);
	const currencyNBU = useTypedSelector((state) => state.currency.NBU);
	const date = useTypedSelector((state) => state.currency.currentDate);
	return (
		<div className={classes.wrapper}>
			<div className={classes.table}>
				<div className={classes.first}>
					<h1 className={classes.c_banner}>Курс валют</h1>
					<span className={classes.day}>{`${date.day} `}</span>
					<span className={classes.month}>{date.month}</span>
					<span className={classes.year}>
						{` ${date.year }`}
					</span>
				</div>
			
			<TitleBanner currencyType={CurrencyType.USD} currencyNBU={currencyNBU} highlighted={true}/>
			<TitleBanner currencyType={CurrencyType.EUR} currencyNBU={currencyNBU}/>
			<TitleBanner currencyType={CurrencyType.PLN} currencyNBU={currencyNBU} highlighted={true}/>
			<TitleBanner currencyType={CurrencyType.GBP} currencyNBU={currencyNBU}/>

			<Banner currencyType={CurrencyType.USD} highlighted={true}/>
			<Banner currencyType={CurrencyType.EUR} />
			<Banner currencyType={CurrencyType.PLN} highlighted={true}/>
			<Banner currencyType={CurrencyType.GBP}/>
			</div>
		</div>
	);
};

export default Table;
