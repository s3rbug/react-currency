import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDate } from "../redux/actions/currency";
import { useTypedSelector } from "../redux/reduxStore";
import { DateFormatType, CurrencyType } from "../types/index_d";
import { combineStyles } from "../utils/helpers";
import Currency from "./Currency";
import CurrencyHeader from "./CurrencyHeader";
import Sort from "./Sort";
import classes from "./Table.module.css";

const Table = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentDate());
    }, [dispatch]);
    const date: DateFormatType = useTypedSelector(
        (state) => state.currency.currentDate
    );
    return (
        <div className={classes.wrapper}>
            <div className={classes.table}>
                <div className={classes.first}>
                    <h1 className={classes.c_banner}>Курс валют</h1>
                    <span className={classes.day}>{date.day + " "}</span>
                    <span className={classes.month}>{date.month}</span>
                    <span className={classes.year}>
                        {" " + date.year + " "}
                    </span>
                </div>
                <div className={combineStyles(classes.color, classes.block)}>
                    <div className={classes.money}>{"USD "}</div>
                    <span className={classes.nbu}>{"НБУ "}</span>
                    <span className={classes.nbu_number}>28.06</span>
                </div>
                <div className={classes.block}>
                    <div className={classes.money}>{"EUR "}</div>
                    <span className={classes.nbu}>{"НБУ "}</span>
                    <span className={classes.nbu_number}>28.06</span>
                </div>
                <div className={combineStyles(classes.color, classes.block)}>
                    <div className={classes.money}>{"PLN "}</div>
                    <span className={classes.nbu}>{"НБУ "}</span>
                    <span className={classes.nbu_number}>28.06</span>
                </div>
                <div className={classes.block}>
                    <div className={classes.money}>{"GBP "}</div>
                    <span className={classes.nbu}>{"НБУ "}</span>
                    <span className={classes.nbu_number}>28.06</span>
                </div>
                <Sort
                    className={combineStyles(
                        classes.sort_usd,
                        classes.highlight
                    )}
                />
                <CurrencyHeader className={classes.header_usd} />
                <div className={classes.content_usd}>
                    <Currency
                        className={classes.highlight}
                        currencyType={CurrencyType.USD}
                    />
                </div>
                <Sort className={classes.sort_eur} />
                <CurrencyHeader className={classes.header_eur} />
                <div className={classes.content_eur}>
                    <Currency currencyType={CurrencyType.EUR} />
                </div>
                <Sort
                    className={combineStyles(
                        classes.sort_pln,
                        classes.highlight
                    )}
                />
                <CurrencyHeader className={classes.header_pln} />
                <div className={classes.content_pln}>
                    <Currency
                        className={classes.highlight}
                        currencyType={CurrencyType.PLN}
                    />
                </div>
                <Sort className={classes.sort_gbp} />
                <CurrencyHeader className={classes.header_gbp} />
                <div className={classes.content_gbp}>
                    <Currency currencyType={CurrencyType.GBP} />
                </div>
            </div>
        </div>
    );
};

export default Table;