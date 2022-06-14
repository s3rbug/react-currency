import {
	Bank,
	BankType,
	CurrencyStateType,
	CurrencyType,
	DateFormatType,
	EmptyMoney,
	SortEnum,
	SortIconType,
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
	banksOrder: [...banks],
	sortIcons: [
		{ // USD
			buy: SortEnum.Default,
			sell: SortEnum.Default,
		},
		{ // EUR
			buy: SortEnum.Default,
			sell: SortEnum.Default,
		}, 
		{ // PLN
			buy: SortEnum.Default,
			sell: SortEnum.Default,
		},  
		{ // GBP
			buy: SortEnum.Default,
			sell: SortEnum.Default,
		}  
	] as Array<SortIconType>,
	sortIconsMobile: [
		{ // USD
			buy: SortEnum.Default,
			sell: SortEnum.Default,
		},
		{ // EUR
			buy: SortEnum.Default,
			sell: SortEnum.Default,
		}, 
		{ // PLN
			buy: SortEnum.Default,
			sell: SortEnum.Default,
		},  
		{ // GBP
			buy: SortEnum.Default,
			sell: SortEnum.Default,
		}  
	] as Array<SortIconType>,
	NBU: {
		usd: "",
		eur: "",
		pln: "",
		gbp: "",
	},
	mobileBanksOrder: [
		[
			// USD
			...banks
		],
		[
			// EUR
			...banks
		],
		[
			// PLN
			...banks
		],
		[
			// GBP
			...banks
		],
	] as Array<Array<BankType>>,
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

function getNextIcon(icon: SortEnum): SortEnum {
	return icon === SortEnum.Reversed ? SortEnum.Sorted : icon + 1
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
				banksOrder: [...banks],
				mobileBanksOrder: [
					[
						...banks
					],
					[
						...banks
					],
					[
						...banks
					],
					[
						...banks
					],
				],
				
			};
		}
		case constants.SORT: {
			const { currencyType, tradeType, isMobile } = action.payload;
			return {
				...state,
				banksOrder: isMobile ? 
				[...state.banksOrder] :
				[...state.banksOrder.sort((bank1, bank2) => {
					switch(currencyType){
						case CurrencyType.USD:
							if(!bank1.currency.usd.buy || !bank2.currency.usd.buy ||
								!bank1.currency.usd.sell || !bank2.currency.usd.sell)
								return 0
							if(tradeType === TradeType.Buy){
								if(state.sortIcons[currencyType].buy === SortEnum.Default)
									return 0
								else if(state.sortIcons[currencyType].buy === SortEnum.Sorted)
									return parseFloat(bank1.currency.usd.buy) - parseFloat(bank2.currency.usd.buy)
								else
									return parseFloat(bank2.currency.usd.buy) - parseFloat(bank1.currency.usd.buy)
							}
							else{
								if(state.sortIcons[currencyType].sell === SortEnum.Default)
									return 0
								else if(state.sortIcons[currencyType].sell === SortEnum.Sorted)
									return parseFloat(bank1.currency.usd.sell) - parseFloat(bank2.currency.usd.sell)
								else
									return parseFloat(bank2.currency.usd.sell) - parseFloat(bank1.currency.usd.sell)
							}
						case CurrencyType.EUR:
							if(!bank1.currency.eur.buy || !bank2.currency.eur.buy ||
								!bank1.currency.eur.sell || !bank2.currency.eur.sell)
								return 0
							if(tradeType === TradeType.Buy){
								if(state.sortIcons[currencyType].buy === SortEnum.Default)
									return 0
								else if(state.sortIcons[currencyType].buy === SortEnum.Sorted)
									return parseFloat(bank1.currency.eur.buy) - parseFloat(bank2.currency.eur.buy)
								else
									return parseFloat(bank2.currency.eur.buy) - parseFloat(bank1.currency.eur.buy)
							}
							else{
								if(state.sortIcons[currencyType].sell === SortEnum.Default)
									return 0
								else if(state.sortIcons[currencyType].sell === SortEnum.Sorted)
									return parseFloat(bank1.currency.eur.sell) - parseFloat(bank2.currency.eur.sell)
								else
									return parseFloat(bank2.currency.eur.sell) - parseFloat(bank1.currency.eur.sell)
							}
						case CurrencyType.PLN:
							if(!bank1.currency.pln.buy || !bank2.currency.pln.buy ||
								!bank1.currency.pln.sell || !bank2.currency.pln.sell)
								return 0
							if(tradeType === TradeType.Buy){
								if(state.sortIcons[currencyType].buy === SortEnum.Default)
									return 0
								else if(state.sortIcons[currencyType].buy === SortEnum.Sorted)
									return parseFloat(bank1.currency.pln.buy) - parseFloat(bank2.currency.pln.buy)
								else
									return parseFloat(bank2.currency.pln.buy) - parseFloat(bank1.currency.pln.buy)
							}
							else{
								if(state.sortIcons[currencyType].sell === SortEnum.Default)
									return 0
								else if(state.sortIcons[currencyType].sell === SortEnum.Sorted)
									return parseFloat(bank1.currency.pln.sell) - parseFloat(bank2.currency.pln.sell)
								else
									return parseFloat(bank2.currency.pln.sell) - parseFloat(bank1.currency.pln.sell)
							}
						case CurrencyType.GBP:
							if(!bank1.currency.gbp.buy || !bank2.currency.gbp.buy ||
								!bank1.currency.gbp.sell || !bank2.currency.gbp.sell)
								return 0
							if(tradeType === TradeType.Buy){
								if(state.sortIcons[currencyType].buy === SortEnum.Default)
									return 0
								else if(state.sortIcons[currencyType].buy === SortEnum.Sorted)
									return parseFloat(bank1.currency.gbp.buy) - parseFloat(bank2.currency.gbp.buy)
								else
									return parseFloat(bank2.currency.gbp.buy) - parseFloat(bank1.currency.gbp.buy)
							}
							else{
								if(state.sortIcons[currencyType].sell === SortEnum.Default)
									return 0
								else if(state.sortIcons[currencyType].sell === SortEnum.Sorted)
									return parseFloat(bank1.currency.gbp.sell) - parseFloat(bank2.currency.gbp.sell)
								else
									return parseFloat(bank2.currency.gbp.sell) - parseFloat(bank1.currency.gbp.sell)
							}
						default:
							return 0

					}
				})],
				mobileBanksOrder: !isMobile ?
				[...state.mobileBanksOrder] :
				[...state.mobileBanksOrder.map((banks, banksId) => {
					if(banksId === currencyType){
						return banks.sort((bank1, bank2) => {
							switch(currencyType){
								case CurrencyType.USD:
									if(!bank1.currency.usd.buy || !bank2.currency.usd.buy ||
										!bank1.currency.usd.sell || !bank2.currency.usd.sell)
										return 0
									if(tradeType === TradeType.Buy){
										if(state.sortIconsMobile[currencyType].buy === SortEnum.Default)
											return 0
										else if(state.sortIconsMobile[currencyType].buy === SortEnum.Sorted)
											return parseFloat(bank1.currency.usd.buy) - parseFloat(bank2.currency.usd.buy)
										else
											return parseFloat(bank2.currency.usd.buy) - parseFloat(bank1.currency.usd.buy)
									}
									else{
										if(state.sortIconsMobile[currencyType].sell === SortEnum.Default)
											return 0
										else if(state.sortIconsMobile[currencyType].sell === SortEnum.Sorted)
											return parseFloat(bank1.currency.usd.sell) - parseFloat(bank2.currency.usd.sell)
										else
											return parseFloat(bank2.currency.usd.sell) - parseFloat(bank1.currency.usd.sell)
									}
								case CurrencyType.EUR:
									if(!bank1.currency.eur.buy || !bank2.currency.eur.buy ||
										!bank1.currency.eur.sell || !bank2.currency.eur.sell)
										return 0
									if(tradeType === TradeType.Buy){
										if(state.sortIconsMobile[currencyType].buy === SortEnum.Default)
											return 0
										else if(state.sortIconsMobile[currencyType].buy === SortEnum.Sorted)
											return parseFloat(bank1.currency.eur.buy) - parseFloat(bank2.currency.eur.buy)
										else
											return parseFloat(bank2.currency.eur.buy) - parseFloat(bank1.currency.eur.buy)
									}
									else{
										if(state.sortIconsMobile[currencyType].sell === SortEnum.Default)
											return 0
										else if(state.sortIconsMobile[currencyType].sell === SortEnum.Sorted)
											return parseFloat(bank1.currency.eur.sell) - parseFloat(bank2.currency.eur.sell)
										else
											return parseFloat(bank2.currency.eur.sell) - parseFloat(bank1.currency.eur.sell)
									}
								case CurrencyType.PLN:
									if(!bank1.currency.pln.buy || !bank2.currency.pln.buy ||
										!bank1.currency.pln.sell || !bank2.currency.pln.sell)
										return 0
									if(tradeType === TradeType.Buy){
										if(state.sortIconsMobile[currencyType].buy === SortEnum.Default)
											return 0
										else if(state.sortIconsMobile[currencyType].buy === SortEnum.Sorted)
											return parseFloat(bank1.currency.pln.buy) - parseFloat(bank2.currency.pln.buy)
										else
											return parseFloat(bank2.currency.pln.buy) - parseFloat(bank1.currency.pln.buy)
									}
									else{
										if(state.sortIconsMobile[currencyType].sell === SortEnum.Default)
											return 0
										else if(state.sortIconsMobile[currencyType].sell === SortEnum.Sorted)
											return parseFloat(bank1.currency.pln.sell) - parseFloat(bank2.currency.pln.sell)
										else
											return parseFloat(bank2.currency.pln.sell) - parseFloat(bank1.currency.pln.sell)
									}
								case CurrencyType.GBP:
									if(!bank1.currency.gbp.buy || !bank2.currency.gbp.buy ||
										!bank1.currency.gbp.sell || !bank2.currency.gbp.sell)
										return 0
									if(tradeType === TradeType.Buy){
										if(state.sortIconsMobile[currencyType].buy === SortEnum.Default)
											return 0
										else if(state.sortIconsMobile[currencyType].buy === SortEnum.Sorted)
											return parseFloat(bank1.currency.gbp.buy) - parseFloat(bank2.currency.gbp.buy)
										else
											return parseFloat(bank2.currency.gbp.buy) - parseFloat(bank1.currency.gbp.buy)
									}
									else{
										if(state.sortIconsMobile[currencyType].sell === SortEnum.Default)
											return 0
										else if(state.sortIconsMobile[currencyType].sell === SortEnum.Sorted)
											return parseFloat(bank1.currency.gbp.sell) - parseFloat(bank2.currency.gbp.sell)
										else
											return parseFloat(bank2.currency.gbp.sell) - parseFloat(bank1.currency.gbp.sell)
									}
								default:
									return 0
		
							}
						})
					}
					else{
						return [...banks]
					}
				})]
			};
		}
		case constants.CHANGE_SORT_ICON: {
			const {currencyType, tradeType, isMobile} = action.payload
			return {
				...state,
				sortIcons: isMobile ? 
					[...state.sortIcons] : 
					[...state.sortIcons.map((icon, iconIndex) => {
					if(iconIndex === currencyType){
						return {
							buy: tradeType === TradeType.Buy ? getNextIcon(icon.buy) : SortEnum.Default,
							sell: tradeType === TradeType.Sell ? getNextIcon(icon.sell) : SortEnum.Default,
						}
					}
					else
						return {
							buy: SortEnum.Default,
							sell: SortEnum.Default
						}
					})],
				sortIconsMobile: !isMobile ?
					[...state.sortIconsMobile] :
					[...state.sortIconsMobile.map((icon, iconIndex) => {
						if(iconIndex === currencyType){
							if(tradeType === TradeType.Buy){
								return {
									buy: getNextIcon(icon.buy),
									sell: SortEnum.Default
								}
							}
							else{
								return {
									buy: SortEnum.Default,
									sell: getNextIcon(icon.sell)
								}
							}
						}
						else{
							return {...icon}
						}
					})]
			}
		}
		case constants.RESET_ICONS: {
			return {
				...state,
				sortIcons: [...state.sortIcons.map(_ => ({
					buy: SortEnum.Default,
					sell: SortEnum.Default
				}))]
			}
		}
		default: {
			return { ...state };
		}
	}
};

export default reducer;
