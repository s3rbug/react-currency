export type DateFormatType = { day: number; month: string; year: number };
export type CurrencyStateType = { currentDate: DateFormatType };
export enum CurrencyType {
    USD = 0,
    EUR,
    PLN,
    GBP
}
