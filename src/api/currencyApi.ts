import { Bank, CurrencyType } from "./../types/index_d";
import axios from "axios";

export const currencyApi = {
	async getCurrencyNBU(currencyType: CurrencyType) {
		const date = new Date();
		const strDate =
			date.getFullYear() +
			(date.getMonth() < 9 ? "0" : "") +
			(date.getMonth() + 1).toString() +
			(date.getDate() < 10 ? "0" : "") +
			date.getDate();

		switch (currencyType) {
			case CurrencyType.USD: {
				return axios.get(
					`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json&date=${strDate}`
				);
			}
			case CurrencyType.EUR: {
				return axios.get(
					`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&json&date=${strDate}`
				);
			}
			case CurrencyType.PLN: {
				return axios.get(
					`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=PLN&json&date=${strDate}`
				);
			}
			case CurrencyType.GBP: {
				return axios.get(
					`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=GBP&json&date=${strDate}`
				);
			}
		}
	},
	async getCurrency(bankType: Bank) {
		switch (bankType) {
			case Bank.Privat: {
				return axios.get(
					"https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
				);
			}
			case Bank.Privat24: {
				return axios.get(
					"https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11"
				);
			}
			case Bank.Mono: {
				return axios.get("https://api.monobank.ua/bank/currency");
			}
		}
	},
};
