import { setNBU, setCurrency } from "./../actions/currency";
import { currencyApi } from "./../../api/currencyApi";
import {
	ThunkDispatchType,
	CurrencyType,
	AnswerNbuType,
	Bank,
	AnswerPrivat,
	EmptyMoney,
	AnswerMono,
	CurrencyCode,
} from "./../../types/index_d";

const PromiseNBU = async (
	dispatch: ThunkDispatchType,
	currencyType: CurrencyType
) => {
	return currencyApi
		.getCurrencyNBU(currencyType)
		.then((response) => response.data[0])
		.then((data: AnswerNbuType) => {
			dispatch(setNBU(currencyType, data.rate.toFixed(2)));
		});
};

export const getCurrencyNBU = () => async (dispatch: ThunkDispatchType) => {
	return Promise.all([
		PromiseNBU(dispatch, CurrencyType.USD),
		PromiseNBU(dispatch, CurrencyType.EUR),
		PromiseNBU(dispatch, CurrencyType.PLN),
		PromiseNBU(dispatch, CurrencyType.GBP),
	]);
};

const format = (el: string | number | undefined): string => {
	if (!el) return "—";
	if (typeof el === "number") return el.toFixed(2).toString();
	return parseFloat(el).toFixed(2).toString();
};

const PromisePrivat = async (
	dispatch: ThunkDispatchType,
	bankType: Bank.Privat | Bank.Privat24
) => {
	return currencyApi
		.getCurrency(bankType)
		.then((response) => response.data)
		.then((data: Array<AnswerPrivat>) => {
			return data.filter((el) => el.ccy === "USD" || el.ccy === "EUR");
		})
		.then((data) => {
			let usd = EmptyMoney,
				eur = EmptyMoney;
			data.forEach((el) => {
				if (el.ccy === "USD") {
					usd = {
						buy: format(el.buy),
						sell: format(el.sale),
					};
				} else if (el.ccy === "EUR") {
					eur = {
						buy: format(el.buy),
						sell: format(el.sale),
					};
				}
			});
			dispatch(
				setCurrency(
					bankType,
					{ ...usd },
					{ ...eur },
					EmptyMoney,
					EmptyMoney
				)
			);
		});
};

const PromiseMono = async (dispatch: ThunkDispatchType) => {
	return currencyApi
		.getCurrency(Bank.Mono)
		.then((response) => response.data)
		.then((data: Array<AnswerMono>) =>
			data.filter((el) => el.currencyCodeB === CurrencyCode.UAH)
		)
		.then((data) => {
			const usd = data.find(
				(el) => el.currencyCodeA === CurrencyCode.USD
			);
			const eur = data.find(
				(el) => el.currencyCodeA === CurrencyCode.EUR
			);
			const pln = data.find(
				(el) => el.currencyCodeA === CurrencyCode.PLN
			);
			const gbp = data.find(
				(el) => el.currencyCodeA === CurrencyCode.GBP
			);

			dispatch(
				setCurrency(
					Bank.Mono,
					usd
						? {
								buy: format(usd.rateBuy),
								sell: format(usd.rateSell),
						  }
						: EmptyMoney,
					eur
						? {
								buy: format(eur.rateBuy),
								sell: format(eur.rateSell),
						  }
						: EmptyMoney,
					pln
						? {
								buy: format(pln.rateBuy),
								sell: format(pln.rateSell),
						  }
						: EmptyMoney,
					gbp
						? {
								buy: format(gbp.rateBuy),
								sell: format(gbp.rateSell),
						  }
						: EmptyMoney,
					usd?.date
				)
			);
		});
};

export const getCurrency = () => async (dispatch: ThunkDispatchType) => {
	return Promise.all([
		PromisePrivat(dispatch, Bank.Privat),
		PromisePrivat(dispatch, Bank.Privat24),
		PromiseMono(dispatch),
	]);
};
