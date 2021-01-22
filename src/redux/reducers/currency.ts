import { CurrencyStateType, DateFormatType } from "./../../types/index_d";
import { ActionType } from "typesafe-actions";
import * as actions from "../actions/currency";
import * as constants from "../constants/currency";

const initialState = {
	currentDate: { day: 0, month: "", year: 0 } as DateFormatType,
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

const reducer = (state = initialState, action: CurrencyActionType) => {
	switch (action.type) {
		case constants.SET_CURRENT_DATE: {
			let date = new Date();
			return {
				...state,
				currentDate: {
					day: date.getDate(),
					month: formatDate(date),
					year: date.getFullYear(),
				} as DateFormatType,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
