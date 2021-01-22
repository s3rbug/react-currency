import { action } from "typesafe-actions";
import * as constants from "../constants/currency";

export const setCurrentDate = () => action(constants.SET_CURRENT_DATE);
