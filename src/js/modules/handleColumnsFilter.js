import fetchData from "./fetchData";
import formURL from "./formURL";
import * as formPageContent from "./formPageContent";
import calcfreeSpace from "./calcFreeSpace";

const handleColumnsFilter = () => {
	const columnSettingsBar = document.querySelector('.column-settings');
	const columnsContainer = columnSettingsBar.querySelector('.column-settings__columns-wrapper');
	const allColumns = columnsContainer.children;

	let columnSettings = localStorage.getItem('column-settings');
	if (columnSettings === null || !columnSettings) {
		localStorage.setItem('column-settings', JSON.stringify({
			order: ['name', 'status', 'payment_status', 'amount'],
			display: {
				name: true,
				status: true,
				payment_status: true,
				amount: true
			}
		}));
	}
	columnSettings = JSON.parse(localStorage.getItem('column-settings'));


	columnSettingsBar.addEventListener('click', event => {
		columnSettings = JSON.parse(localStorage.getItem('column-settings'));
		const directionBtn = event.target.closest('.column-settings__control-btn');
		const columnBox = event.target.closest('.column-settings__column-box');
		const displayBtn = event.target.closest('.column-box__display-btn');
		const activeColumnBox = columnSettingsBar.querySelector('.column-settings__column-box.active');
		const appSettings = JSON.parse(localStorage.getItem('app-settings'));

		if (directionBtn && activeColumnBox) {
			const copyColumn = activeColumnBox.cloneNode(true);

			const startBtn = columnSettingsBar.querySelector('.column-settings__control-btn_start');
			const leftBtn = columnSettingsBar.querySelector('.column-settings__control-btn_left');
			const rightBtn = columnSettingsBar.querySelector('.column-settings__control-btn_right');
			const endBtn = columnSettingsBar.querySelector('.column-settings__control-btn_end');
			
			if (directionBtn === startBtn) {
				if (activeColumnBox === allColumns[0]) return;
				activeColumnBox.remove();
				columnsContainer.prepend(copyColumn);
				columnSettings.order = formColumnSettingsOrder();

			} else if (directionBtn === leftBtn) {
				if (activeColumnBox === allColumns[0]) return;
				const prevColumn = activeColumnBox.previousElementSibling;
				activeColumnBox.remove();
				prevColumn.before(copyColumn);
				columnSettings.order = formColumnSettingsOrder();

			} else if (directionBtn === rightBtn) {
				if (activeColumnBox === allColumns[allColumns.length - 1]) return;
				const nextColumn = activeColumnBox.nextElementSibling;
				activeColumnBox.remove();
				nextColumn.after(copyColumn);
				columnSettings.order = formColumnSettingsOrder();

			} else if (directionBtn === endBtn) {
				if (activeColumnBox === allColumns[allColumns.length - 1]) return;
				activeColumnBox.remove();
				columnsContainer.append(copyColumn);
				columnSettings.order = formColumnSettingsOrder();
			}
			localStorage.setItem('column-settings', JSON.stringify(columnSettings));

			formPageContent.addLoadScreen();

			formPageContent.changsUserListColumns({
				setOrder: true,
			});
			formPageContent.formNavBar();
		}

		if (displayBtn) {
			if (displayBtn.classList.contains('on')) {
				const activeColumnsAmount = columnSettingsBar.querySelectorAll('.column-box__display-btn.on').length;
				if (activeColumnsAmount <= 1) return;

				displayBtn.classList.remove('on');
				displayBtn.classList.add('off');
				columnSettings.display = formColumnSettingsDisplay();

				let sortingWasReset = false;
				 
				if (appSettings.sort_by) {
					for (let key in columnSettings.display) {
						if (columnSettings.display[key] === false) {
							if (appSettings.sort_by === key) {
								localStorage.setItem('column-settings', JSON.stringify(columnSettings));
								delete appSettings.sort_by;
								delete appSettings.sort_direction;
								sortingWasReset = true;
								localStorage.setItem('app-settings', JSON.stringify(appSettings));
							}
						}
					}
				}
				if (sortingWasReset) {
					formPageContent.addLoadScreen();
					formPageContent.formNavBar();
					formPageContent.formColumnHeaders();
					fetchData({
						method: 'GET',
						url: formURL(),
						callback: callbackFunc,
						headers: {
							'accept': 'application/json'
						}
					});
					return;
				}
			} else {
				displayBtn.classList.add('on');
				displayBtn.classList.remove('off');
				columnSettings.display = formColumnSettingsDisplay();
			}

			localStorage.setItem('column-settings', JSON.stringify(columnSettings));
			formPageContent.addLoadScreen();
			formPageContent.formNavBar();
			calcfreeSpace(true);
			formPageContent.changsUserListColumns({
				setWidth: true,
				setDisplay: true
			});
		}

		if (columnBox) {
			if (columnBox.classList.contains('active')) {
				return;
			} else {
				const activeColumnBox = columnSettingsBar.querySelector('.column-settings__column-box.active');
				if (activeColumnBox) {
					activeColumnBox.classList.remove('active');
				}
				columnBox.classList.add('active');
			}
		}
	});

	function formColumnSettingsOrder() {
		const nameColumn = columnSettingsBar.querySelector('.column-box_name');
		const statusColumn = columnSettingsBar.querySelector('.column-box_status');
		const paymentStatusColumn = columnSettingsBar.querySelector('.column-box_payment-status');
		const orderArr = [];
		const allColumsArr = [...allColumns];
		allColumsArr.forEach(elem => {
			 const column = elem === nameColumn ? 'name' :
			 elem === statusColumn ? 'status' :
				 elem === paymentStatusColumn ? 'payment_status' : 'amount';
			orderArr.push(column);
		});
		return orderArr;
	}

	function formColumnSettingsDisplay() {
		const nameColumn = columnSettingsBar.querySelector('.column-box_name');
		const statusColumn = columnSettingsBar.querySelector('.column-box_status');
		const paymentStatusColumn = columnSettingsBar.querySelector('.column-box_payment-status');
		const displayObj = {};
		const allColumsArr = [...allColumns];
		let isDisplayed;
		allColumsArr.forEach((elem, index) => {
			const eyeBtn = allColumsArr[index].querySelector('.column-box__display-btn.off');
			
			if (!eyeBtn) {
				isDisplayed = true;
			} else {
				isDisplayed = false;
			}
			
			const column = elem === nameColumn ? 'name' :
				elem === statusColumn ? 'status' :
					elem === paymentStatusColumn ? 'payment_status' : 'amount';
			displayObj[column] = isDisplayed;
		});
		return displayObj;
	}

	function callbackFunc(data) {
		formPageContent.formUserList(data);
		formPageContent.changsUserListColumns({
			setWidth: true,
			setOrder: true,
			setDisplay: true
		});
		formPageContent.formPagination(data);
	}
};

export default handleColumnsFilter;

