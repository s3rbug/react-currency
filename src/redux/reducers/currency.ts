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

// Variables for initial state
const EmptyCurrency = {
	usd: EmptyMoney,
	eur: EmptyMoney,
	pln: EmptyMoney,
	gbp: EmptyMoney,
};

const emptyBanks = [
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

const emptySortIcons =[
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
	] as Array<SortIconType>

const initialState = {
	currentDate: { day: 0, month: "", year: 0 } as DateFormatType,
	banksOrder: [...emptyBanks],
	sortIcons: [...emptySortIcons],
	sortIconsMobile: [...emptySortIcons],
	NBU: {
		usd: "",
		eur: "",
		pln: "",
		gbp: "",
	},
	mobileBanksOrder: [
		[
			// USD
			...emptyBanks
		],
		[
			// EUR
			...emptyBanks
		],
		[
			// PLN
			...emptyBanks
		],
		[
			// GBP
			...emptyBanks
		],
	] as Array<Array<BankType>>,
} as CurrencyStateType;

export type CurrencyActionType = ActionType<typeof actions>;

// Translate number of month into Ukrainian language
const getMonthName = (date: Date): string => {
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

// Format date to show
const formatDate = (date: Date): string => {
	return ((date.getHours() < 10 ? "0" : "") +
			date.getHours() + ":" +
			(date.getMinutes() < 10 ? "0" : "") +
			date.getMinutes())
}

// Get value of the next sort icon when clicked
const getNextIcon = (icon: SortEnum): SortEnum => {
	return icon === SortEnum.Reversed ? SortEnum.Sorted : icon + 1
}

// Compare two BankType object to sort them
const compareBanksCurrency = (bank1: BankType, bank2: BankType, tradeType: TradeType, currencyType: CurrencyType, sortIcon: SortIconType): number => {
	let buy1, buy2,
		sell1, sell2
	switch(currencyType){
		case CurrencyType.USD: {
			buy1 = bank1.currency.usd.buy
			sell1 = bank1.currency.usd.sell
			buy2 = bank2.currency.usd.buy
			sell2 = bank2.currency.usd.sell
			break
		}
		case CurrencyType.EUR: {
			buy1 = bank1.currency.eur.buy
			sell1 = bank1.currency.eur.sell
			buy2 = bank2.currency.eur.buy
			sell2 = bank2.currency.eur.sell
			break
		}
		case CurrencyType.PLN: {
			buy1 = bank1.currency.pln.buy
			sell1 = bank1.currency.pln.sell
			buy2 = bank2.currency.pln.buy
			sell2 = bank2.currency.pln.sell
			break
		}
		case CurrencyType.GBP:{
			buy1 = bank1.currency.gbp.buy
			sell1 = bank1.currency.gbp.sell
			buy2 = bank2.currency.gbp.buy
			sell2 = bank2.currency.gbp.sell
			break
		}
	}
	if(tradeType === TradeType.Buy){
		if(!buy1 || !buy2 || sortIcon.buy === SortEnum.Default)
			return 0
		if(sortIcon.buy === SortEnum.Sorted)
			return parseFloat(buy1) - parseFloat(buy2)
		else
			return parseFloat(buy2) - parseFloat(buy1)
		
	}
	else{
		if(!sell1 || !sell2 || sortIcon.sell === SortEnum.Default)
			return 0
			if(sortIcon.sell === SortEnum.Sorted)
			return parseFloat(sell1) - parseFloat(sell2)
		else
			return parseFloat(sell2) - parseFloat(sell1)
	}
}

const reducer = (state = initialState, action: CurrencyActionType) => {
	switch (action.type) {
		case constants.SET_CURRENT_DATE: {	// Set current date in the date widget
			const date = new Date();
			return {
				...state,
				currentDate: {
					day: date.getDate(),
					month: getMonthName(date),
					year: date.getFullYear(),
				} as DateFormatType,
			};
		}
		case constants.SET_NBU: {	// Set NBU (National Bank of Ukraine) currency value
			const { currencyType, value } = action.payload;
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
		case constants.SET_CURRENCY: {	// Set currency to chosen bank
			const { bankType, usd, eur, pln, gbp, time } = action.payload;
			let date = new Date();
			if (time) date.setUTCSeconds(time);
			return {
				...state,
				banksOrder: [...state.banksOrder.map(bank => {
					if(bank.type === bankType){
						return {
								...bank,
								time: formatDate(date),
								currency: {
									usd: { ...usd },
									eur: { ...eur },
									pln: { ...pln },
									gbp: { ...gbp },
								},
							};
					}
					else{
						return {...bank}
					}
				})],
				mobileBanksOrder: [
					...state.mobileBanksOrder.map(banks => {
						return [...banks.map(bank => {
							if(bank.type === bankType){
								return {
									...bank,
									time: formatDate(date),
									currency: {
										usd: { ...usd },
										eur: { ...eur },
										pln: { ...pln },
										gbp: { ...gbp },
								},
								}
							}
							else{
								return {
								...bank
								}
							}
						})]
					})
				],
				
			};
		}
		case constants.SORT: {	// Sort banks
			const { currencyType, tradeType, isMobile } = action.payload;
			return {
				...state,
				banksOrder: isMobile ? 
				[...state.banksOrder] :
				[...state.banksOrder.sort((bank1, bank2) => {
					switch(currencyType){
						case CurrencyType.USD: {
							return compareBanksCurrency(bank1, bank2, tradeType, CurrencyType.USD, state.sortIcons[CurrencyType.USD])
						}
						case CurrencyType.EUR: {
							return compareBanksCurrency(bank1, bank2, tradeType, CurrencyType.EUR, state.sortIcons[CurrencyType.EUR])
						}
						case CurrencyType.PLN: {
							return compareBanksCurrency(bank1, bank2, tradeType, CurrencyType.PLN, state.sortIcons[CurrencyType.PLN])
						}
						case CurrencyType.GBP: {
							return compareBanksCurrency(bank1, bank2, tradeType, CurrencyType.GBP, state.sortIcons[CurrencyType.GBP])
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
								case CurrencyType.USD: {
									return compareBanksCurrency(bank1, bank2, tradeType, CurrencyType.USD, state.sortIconsMobile[CurrencyType.USD])
								}
								case CurrencyType.EUR: {
									return compareBanksCurrency(bank1, bank2, tradeType, CurrencyType.EUR, state.sortIconsMobile[CurrencyType.EUR])
								}
								case CurrencyType.PLN: {
									return compareBanksCurrency(bank1, bank2, tradeType, CurrencyType.PLN, state.sortIconsMobile[CurrencyType.PLN])
								}
								case CurrencyType.GBP: {
									return compareBanksCurrency(bank1, bank2, tradeType, CurrencyType.GBP, state.sortIconsMobile[CurrencyType.GBP])
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
		case constants.CHANGE_SORT_ICON: {	// Change sort icons
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
		default: {	// Return state without changes if incorrect constant
			return { ...state };
		}
	}
};

export default reducer;
