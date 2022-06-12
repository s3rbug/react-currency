import {
	Bank,
	BankType,
	CurrencyStateType,
	CurrencyType,
	DateFormatType,
	EmptyMoney,
	SortEnum,
	TradeType,
} from "./../../types/index_d";
import { ActionType } from "typesafe-actions";
import * as actions from "../actions/currency";
import * as constants from "../constants/currency";
import PrivatImage from "../../assets/privat.png";
import Privat24Image from "../../assets/privat24.png";
import MonoImage from "../../assets/mono.jpg";

const EmptyCurrency = {
	usd: EmptyMoney,
	eur: EmptyMoney,
	pln: EmptyMoney,
	gbp: EmptyMoney,
};

let banks = [
	{
		alt: "ПриватБанк",
		href: "https://privatbank.ua/",
		time: "00:00",
		image: PrivatImage,
		currency: EmptyCurrency,
		type: Bank.Privat,
	},
	{
		alt: "Приват24",
		href: "https://www.privat24.ua/",
		time: "00:00",
		image: Privat24Image,
		currency: EmptyCurrency,
		type: Bank.Privat24,
	},
	{
		alt: "Monobank",
		href: "https://www.monobank.ua/",
		time: "00:00",
		image: MonoImage,
		currency: EmptyCurrency,
		type: Bank.Mono,
	},
] as Array<BankType>;

const initialState = {
	currentDate: { day: 0, month: "", year: 0 } as DateFormatType,
	NBU: {
		usd: "",
		eur: "",
		pln: "",
		gbp: "",
	},
	banksOrder: [
		{
			// USD
			banks: [...banks],
		},
		{
			// EUR
			banks: [...banks],
		},
		{
			// PLN
			banks: [...banks],
		},
		{
			// GBP
			banks: [...banks],
		},
	],
} as CurrencyStateType;

export type CurrencyActionType = ActionType<typeof actions>;

const formatDate = (date: Date): string => {
	switch (date.getMonth()) {
		case 0: {
			return "січня";
		}
		case 1: {
			return "лютого";
		}
		case 2: {
			return "березня";
		}
		case 3: {
			return "квітня";
		}
		case 4: {
			return "травня";
		}
		case 5: {
			return "червня";
		}
		case 6: {
			return "липня";
		}
		case 7: {
			return "серпня";
		}
		case 8: {
			return "вересня";
		}
		case 9: {
			return "жовтня";
		}
		case 10: {
			return "листопада";
		}
		case 11: {
			return "грудня";
		}
	}
	return "помилка";
};

function getRandomInt(min: number, max: number): string {
	min = Math.ceil(min);
	max = Math.floor(max);
	return (Math.floor(Math.random() * (max - min)) + min).toString(); 
}

const reducer = (state = initialState, action: CurrencyActionType) => {
	switch (action.type) {
		case constants.SET_CURRENT_DATE: {
			const date = new Date();
			return {
				...state,
				currentDate: {
					day: date.getDate(),
					month: formatDate(date),
					year: date.getFullYear(),
				} as DateFormatType,
			};
		}
		case constants.SET_NBU: {
			let { currencyType, value } = action.payload;
			return {
				...state,
				NBU: {
					usd:
						currencyType === CurrencyType.USD
							? value
							: state.NBU.usd,
					eur:
						currencyType === CurrencyType.EUR
							? value
							: state.NBU.eur,
					pln:
						currencyType === CurrencyType.PLN
							? value
							: state.NBU.pln,
					gbp:
						currencyType === CurrencyType.GBP
							? value
							: state.NBU.gbp,
				},
			};
		}
		case constants.SET_CURRENCY: {
			let { bankType, usd, eur, pln, gbp, time } = action.payload;
			usd = {
				buy: getRandomInt(1, 20),
				sell: getRandomInt(1, 20),
			};
			eur = {
				buy: getRandomInt(1, 20),
				sell: getRandomInt(1, 20),
			};
			pln = {
				buy: getRandomInt(1, 20),
				sell: getRandomInt(1, 20),
			};
			gbp = {
				buy: getRandomInt(1, 20),
				sell: getRandomInt(1, 20),
			};
			let date = new Date();
			if (time) date.setUTCSeconds(time);
			banks = banks.map((bank) => {
				if (bank.type === bankType) {
					return {
						...bank,
						time:
							(date.getHours() < 10 ? "0" : "") +
							date.getHours() +
							":" +
							(date.getMinutes() < 10 ? "0" : "") +
							date.getMinutes(),
						currency: {
							usd: { ...usd },
							eur: { ...eur },
							pln: { ...pln },
							gbp: { ...gbp },
						},
					};
				}
				return bank;
			});
			return {
				...state,
				banksOrder: [
					{
						...state.banksOrder[0],
						banks: [...banks],
					},
					{
						...state.banksOrder[1],
						banks: [...banks],
					},
					{
						...state.banksOrder[2],
						banks: [...banks],
					},
					{
						...state.banksOrder[3],
						banks: [...banks],
					},
				],
			};
		}
		case constants.SORT: {
			const { currencyType, tradeType } = action.payload;
			return {
				...state,
			};
		}
		default: {
			return { ...state };
		}
	}
};

export default reducer;
