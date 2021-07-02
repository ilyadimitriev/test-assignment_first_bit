const calcfreeSpace = (reset = false) => {
	const columnSettings = JSON.parse(localStorage.getItem('column-settings'));
	const colWrapper = document.querySelector('.bar__section-wrapper');
	const colName = colWrapper.querySelector('.bar__section_name');
	const colUserStatus = colWrapper.querySelector('.bar__section_user-status');
	const colPaymentStatus = colWrapper.querySelector('.bar__section_payment-status');
	const colAmount = colWrapper.querySelector('.bar__section_amount');



	if (reset) {
		colName.style.removeProperty('width');
		colUserStatus.style.removeProperty('width');
		colPaymentStatus.style.removeProperty('width');
		colAmount.style.removeProperty('width');

		const columnsAmount = columnSettings.order.filter(elem => {
			if (columnSettings.display[elem] === true) return elem;
		});
		if (columnsAmount.length < columnSettings.order.length) {
			columnSettings.order.forEach(elem => {
				const currenColumn = elem === 'name' ? colName :
					elem === 'status' ? colUserStatus :
						elem === 'payment_status' ? colPaymentStatus : colAmount;
				if (columnSettings.display[elem] === false) {
					currenColumn.style.width = '0px';
				} else {
					currenColumn.style.width = Math.floor(parseInt(getComputedStyle(colWrapper).width, 10) / columnsAmount.length) + 'px';
				}
			});

		} else {
			colName.style.width = getComputedStyle(colName).width;
			colUserStatus.style.width = getComputedStyle(colUserStatus).width;
			colPaymentStatus.style.width = getComputedStyle(colPaymentStatus).width;
			colAmount.style.width = getComputedStyle(colAmount).width;
		}
	} else {
		colName.style.width = getComputedStyle(colName).width;
		colUserStatus.style.width = getComputedStyle(colUserStatus).width;
		colPaymentStatus.style.width = getComputedStyle(colPaymentStatus).width;
		colAmount.style.width = getComputedStyle(colAmount).width;
	}
	let col1;
	let col2;
	let col3;
	let col4;
	let col1Name;
	let col2Name;
	let col3Name;
	let col4Name;
	let col1Style;
	let col2Style;
	let col3Style;
	let col4Style;
	let col1FreeSpace;
	let col2FreeSpace;
	let col3FreeSpace;
	let col4FreeSpace;
	let colWidth;
	let colMinWidth;

	columnSettings.order.forEach((elem, index) => {
		const currenColumn = elem === 'name' ? colName :
			elem === 'status' ? colUserStatus :
				elem === 'payment_status' ? colPaymentStatus : colAmount;
		if (index === 0) {
			col1Name = elem;
			col1 = currenColumn;
			col1Style = getComputedStyle(col1);
		} else if (index === 1) {
			col2Name = elem;
			col2 = currenColumn;
			col2Style = getComputedStyle(col2);
		} else if (index === 2) {
			col3Name = elem;
			col3 = currenColumn;
			col3Style = getComputedStyle(col3);
		} else {
			col4Name = elem;
			col4 = currenColumn;
			col4Style = getComputedStyle(col4);
		}
	});

	columnSettings.order.forEach((elem, index) => {
		if (columnSettings.display[elem] === true) {
			if (index === 0) {
				colWidth = columnSettings.display[col1Name] === true ? parseInt(col1.style.width, 10) : 0;
				colMinWidth = columnSettings.display[col1Name] === true ? parseInt(col1Style.minWidth, 10) : 0;
				col1FreeSpace =  (colWidth - colMinWidth < 0) ? 0 : colWidth - colMinWidth;
			} else if (index === 1) {
				colWidth = columnSettings.display[col2Name] === true ? parseInt(col2.style.width, 10) : 0;
				colMinWidth = columnSettings.display[col2Name] === true ? parseInt(col2Style.minWidth, 10) : 0;
				col2FreeSpace = (colWidth - colMinWidth < 0) ? 0 : colWidth - colMinWidth;
			} else if (index === 2) {
				colWidth = columnSettings.display[col3Name] === true ? parseInt(col3.style.width, 10) : 0;
				colMinWidth = columnSettings.display[col3Name] === true ? parseInt(col3Style.minWidth, 10) : 0;
				col3FreeSpace = (colWidth - colMinWidth < 0) ? 0 : colWidth - colMinWidth;
			} else {
				colWidth = columnSettings.display[col4Name] === true ? parseInt(col4.style.width, 10) : 0;
				colMinWidth = columnSettings.display[col4Name] === true ? parseInt(col4Style.minWidth, 10) : 0;
				col4FreeSpace = (colWidth - colMinWidth < 0) ? 0 : colWidth - colMinWidth;
			}
		} else {
			col4FreeSpace = 0;
		}
	});


	columnSettings.free_space = {};


	columnSettings.order.forEach((elem, index) => {
		if (index === 0) {
			columnSettings.free_space[elem] = col1FreeSpace;
		} else if (index === 1) {
			columnSettings.free_space[elem] = col2FreeSpace;
		} else if (index === 2) {
			columnSettings.free_space[elem] = col3FreeSpace;
		} else {
			columnSettings.free_space[elem] = col4FreeSpace;
		}
	});

	localStorage.setItem('column-settings', JSON.stringify(columnSettings));

};

export default calcfreeSpace;
