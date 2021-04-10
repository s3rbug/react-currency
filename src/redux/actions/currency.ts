import {
	Bank,
	CurrencyType,
	MoneyType,
	TradeType,
} from "./../../types/index_d";
import { action } from "typesafe-actions";
import * as constants from "../constants/currency";

export const setCurrentDate = () => action(constants.SET_CURRENT_DATE);

export const setNBU = (currencyType: CurrencyType, value: string) =>
	action(constants.SET_NBU, { currencyType, value });

export const setCurrency = (
	bankType: Bank,
	usd: MoneyType,
	eur: MoneyType,
	pln: MoneyType,
	gbp: MoneyType,
	time?: number
) => action(constants.SET_CURRENCY, { bankType, usd, eur, pln, gbp, time });

export const sortCurrency = (
	currencyType: CurrencyType,
	tradeType: TradeType
) => action(constants.SORT, { currencyType, tradeType });
