const formDate = rowDate => {
	const date = new Date(rowDate * 1000);

	const allMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

	const year = date.getFullYear();
	const month = allMonths[date.getMonth()];
	const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();

	const response = day + '/' +  month + '/' + year;

	return response;
};

export default formDate;
