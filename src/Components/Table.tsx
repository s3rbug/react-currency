import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDate } from "../redux/actions/currency";
import { useTypedSelector } from "../redux/reduxStore";
import { DateFormatType } from "../types/index_d";
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
		<table>
			<thead>
				<div className={classes.header}>
					<div className={classes.first}>
						<h1 className={classes.c_banner}>Курс валют</h1>
						<span className={classes.day}>{date.day + " "}</span>
						<span className={classes.month}>{date.month}</span>
						<span className={classes.year}>{" " + date.year + " "}</span>
					</div>
					<div className={classes.color + " " + classes.block}>
						<div className={classes.money}>USD</div>
						<span className={classes.nbu}>{"НБУ "}</span>
						<span className={classes.nbu_number}>28.06</span>
					</div>
					<div className={classes.block}>
						<div className={classes.money}>EUR</div>
						<span className={classes.nbu}>{"НБУ "}</span>
						<span className={classes.nbu_number}>28.06</span>
					</div>
					<div className={classes.color + " " + classes.block}>
						<div className={classes.money}>PLN</div>
						<span className={classes.nbu}>{"НБУ "}</span>
						<span className={classes.nbu_number}>28.06</span>
					</div>
					<div className={classes.block}>
						<div className={classes.money}>GBP</div>
						<span className={classes.nbu}>{"НБУ "}</span>
						<span className={classes.nbu_number}>28.06</span>
					</div>
				</div>
			</thead>
		</table>
	);
};

export default Table;
