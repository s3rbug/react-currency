import React from "react";
import { CurrencyType } from "../types/index_d";
import { combineStyles } from "../utils/helpers";
import classes from "./Currency.module.css";

type PropsType = {
    currencyType: CurrencyType;
    className?: string;
};

const Currency = ({ currencyType, className }: PropsType) => {
    return (
        <div className={combineStyles(classes.wrapper, className)}>
            <div>15.00</div>
            <div>10.00</div>
            <div>15.00</div>
            <div>10.00</div>
            <div>15.00</div>
            <div>10.00</div>
        </div>
    );
};

export default Currency;
