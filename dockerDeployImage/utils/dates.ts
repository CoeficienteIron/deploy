import { QUARTERS } from "../constants/constants.ts";
import { QUARTERS_TYPES } from "../types/types.ts";

function getByYear(date: string, year: number): boolean {
	const currentDate = new Date(date);
	const currentYear = currentDate.getFullYear();
	return currentYear === year;
}

function calculateSeconds(record: number | any): number {
	if (record === undefined) {
		return 0
	};

	const times = record.toString().split(":");
	const hours = times[0] * 60 * 60;
	const minutes = times[1] * 60;
	const seconds = times[2];
	return hours + minutes + seconds;
}

function calculateSecondsPower(record: string): number {
	const customRecord = record?.split(":")[2]
	if (typeof customRecord === 'undefined') {
		return 0
	}
	return parseFloat(customRecord);
}

function getByQuarter(date: string, currentYear: number, currentQuarter: QUARTERS_TYPES = "ALL"): boolean {
	const currentFilters = Object.keys(QUARTERS);
	const dateFormated = new Date(date);
	const year = dateFormated.getFullYear();
	const month = dateFormated.getMonth();

	const filterByMonth = !currentFilters.includes(currentQuarter);

	if (filterByMonth) {
		return year === currentYear
	}

	return year === currentYear && QUARTERS[currentQuarter].includes(month);
}

function differenceInDays(date1: any, date2: any) {
	date1 = new Date(date1);
	date2 = new Date(date2);

	date1.setHours(0, 0, 0, 0);
	date2.setHours(0, 0, 0, 0);

	const diffInMs = date2 - date1;

	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	return diffInDays;
}

export { getByYear, calculateSeconds, calculateSecondsPower, getByQuarter, differenceInDays };
