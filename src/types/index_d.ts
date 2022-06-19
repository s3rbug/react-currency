import * as currencyActions from "../redux/actions/currency";
import { ActionType } from "typesafe-actions";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "./../redux/reduxStore";

export type DateFormatType = { day: number; month: string; year: number };

export type CurrencyStateType = {
	currentDate: DateFormatType;
	sortIcons: Array<SortIconType>;
	sortIconsMobile: Array<SortIconType>;
	NBU: NbuCurrencyType;
	mobileBanksOrder: Array<Array<BankType>>;
	banksOrder: Array<BankType>;
};
export enum CurrencyType {
	USD = 0,
	EUR,
	PLN,
	GBP,
}

export type NbuCurrencyType = {
	usd: string | undefined;
	eur: string | undefined;
	pln: string | undefined;
	gbp: string | undefined;
}

export type actions = typeof currencyActions;

export type ActionsType = ActionType<actions>;

export type ThunkDispatchType = ThunkDispatch<AppStateType, void, ActionsType>;

export type AnswerNbuType = {
	r030: number;
	txt: string;
	rate: number;
	cc: string;
	exchangedate: string;
};
export type BankType = {
	alt: string;
	href: string;
	time: string;
	image: string;
	currency: CurrencyValueType;
	type: Bank;
};

export type CurrencyValueType = {
	usd: MoneyType;
	eur: MoneyType;
	pln: MoneyType;
	gbp: MoneyType;
};

export type AnswerPrivat = {
	ccy: string;
	base_ccy: string;
	buy: string;
	sale: string;
};

export type MoneyType = {
	buy: string | undefined;
	sell: string | undefined;
};

export const EmptyMoney = {
	buy: "—",
	sell: "—",
} as MoneyType;

export enum Bank {
	Privat = 0,
	Privat24,
	Mono,
}

export type AnswerMono = {
	currencyCodeA: number;
	currencyCodeB: number;
	date: number;
	rateBuy: number;
	rateSell: number;
	rateCross?: number;
};

export const CurrencyCode = {
	UAH: 980,
	USD: 840,
	EUR: 978,
	PLN: 985,
	GBP: 826,
};

export enum SortEnum {
	Default = 0,
	Sorted,
	Reversed,
}

export type SortIconType = {
	buy: SortEnum;
	sell: SortEnum;
}

export enum TradeType {
	Buy = 0,
	Sell,
}
