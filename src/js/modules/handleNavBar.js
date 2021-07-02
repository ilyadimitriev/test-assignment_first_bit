import * as formPageContent from "./formPageContent";
import formURL from "./formURL";
import fetchData from "./fetchData";
import calcfreeSpace from "./calcFreeSpace";

const handleNavBar = () => {
	const headersBar = document.querySelector('.bar');
	handleColumnsSorting();
	handleColumnsWidth();

	function handleColumnsSorting() {
		headersBar.addEventListener('click', event => {
			const targetColumn = event.target.closest('.bar__header');
			const focusedColumn = headersBar.querySelector('.bar__header.focus');
			let localData = {};
			if (targetColumn) {
				const columnType = targetColumn.classList.contains('bar__header-name') ? 'name' :
					targetColumn.classList.contains('bar__header-status') ? 'status' :
						targetColumn.classList.contains('bar__header-payment_status') ? 'payment_status' :
							targetColumn.classList.contains('bar__header-amount') ? 'amount' : null;
	
				if (!columnType) {
					return console.error('Columns headers are broken. Please, reload the page.');
				} else {
					localData.sort_by = columnType;
				}
	
				if (focusedColumn) {
					if (targetColumn === focusedColumn) {
	
						if (targetColumn.classList.contains('descending')) {
							localData.sort_direction = 'asc';
							sendSortRequest();
						} else {
							localData.sort_direction = 'desc';
							sendSortRequest();
						}
	
						targetColumn.classList.toggle('descending');
						targetColumn.classList.toggle('ascending');
					} else {
						localData.sort_direction = 'asc';
						sendSortRequest();
	
						focusedColumn.classList.remove('focus', 'descending', 'ascending');
						targetColumn.classList.add('focus','ascending');
					};
				} else {
					localData.sort_direction = 'asc';
					sendSortRequest();
					targetColumn.classList.add('focus','ascending');
				}
	
			} else return;
	
			function sendSortRequest() {
				const appSettings = JSON.parse(localStorage.getItem('app-settings'));
				appSettings['sort_direction'] = localData.sort_direction;
				appSettings['sort_by'] = localData.sort_by;
				appSettings['page'] = 1;
	
				localStorage.setItem(`app-settings`, JSON.stringify(appSettings));
				formPageContent.addLoadScreen();
				fetchData({
					method: 'GET',
					url: formURL(),
					callback: handleFilterResponse,
					headers: {
						'accept': 'application/json'
					}
				});
			}
	
			function handleFilterResponse(data) {
				//error 422
				if (data.errors) {
					let response = data.message + ' Errors: ';
					for (let key in data.errors) {
						data.errors[key].forEach(value => {
							response+= value + ' ';
						});
					}
					console.error(response);
	
				} else {// sucsess
					formPageContent.formUserList(data);
					formPageContent.changsUserListColumns({
						setWidth: true,
						setOrder: true,
						setDisplay: true
					});
					formPageContent.formPagination(data);
				}
			}
		});
	
	}
	
	function handleColumnsWidth() {
		headersBar.addEventListener('mousedown', event => {
			let columnSettings = JSON.parse(localStorage.getItem('column-settings'));
			const nameColumn = headersBar.querySelector('.bar__section_name');
			const statusColumn = headersBar.querySelector('.bar__section_user-status');
			const paymentStatusColumn = headersBar.querySelector('.bar__section_payment-status');
			const amountColumn = headersBar.querySelector('.bar__section_amount');
			const nameColumnMinWidth = parseInt(getComputedStyle(nameColumn).minWidth, 10);
			const statusColumnMinWidth = parseInt(getComputedStyle(statusColumn).minWidth, 10);
			const paymentStatusColumnMinWidth = parseInt(getComputedStyle(paymentStatusColumn).minWidth, 10);
			const amountColumnMinWidth = parseInt(getComputedStyle(amountColumn).minWidth, 10);
			const dragBtn = event.target.closest('.bar__width-slider');
			const resetBtn = event.target.closest('.bar__btn-options');
			let currentColumn;
			let currentColumnType;
			let currenColumnMinWidth;
			let maxLeftFreeSpace;
			let maxRightFreeSpace;
			let startX = event.clientX;
			let startFreeSpace = {};
			let margin;
			let wrapper;
			if (dragBtn) {
				calcfreeSpace();
				currentColumn = event.target.closest('.bar__section_resizeble');
				
				currentColumnType = currentColumn === nameColumn ? 'name' :
					currentColumn === statusColumn ? 'status' :
						currentColumn === paymentStatusColumn ? 'payment_status' : 'amount';

				maxLeftFreeSpace = calcMaxFreeSpace(currentColumnType, 'left');
				maxRightFreeSpace = calcMaxFreeSpace(currentColumnType, 'right');
				for (let key in columnSettings.free_space) {
					startFreeSpace[key] = columnSettings.free_space[key];
				}

				document.addEventListener('mousemove', distributeFreeSpace);
				throttle(setUserColumnsWidth, 30);
				document.addEventListener('mouseup', (event) => {
					calcfreeSpace();
					distributeFreeSpace(event);
					setUserColumnsWidth();
					document.removeEventListener('mousemove', distributeFreeSpace);
					document.removeEventListener('mousemove', wrapper);
				}, {once: true});

				function throttle(fn, delay) {
					let isThrottled = false,
						savedArgs,
						savedThis;
					wrapper = wrapperFunc;
				document.addEventListener('mousemove', wrapper);
				function wrapperFunc(...args) {
					if (isThrottled) {
						savedArgs = args;
						savedThis = this;
						return;
					}
					fn.call(this, ...args);
					isThrottled = true;
					setTimeout(() => {
						isThrottled = false;
						if (savedArgs) {
							wrapper.call(savedThis, ...savedArgs);
							savedArgs = savedThis = null;
						}
					}, delay);
				}
				}
				function setUserColumnsWidth() {
					formPageContent.changsUserListColumns({
						setWidth: true
					});
				}
				return;
			}

			if (resetBtn) {
				const appSettings = JSON.parse(localStorage.getItem('app-settings'));

				localStorage.setItem('column-settings', JSON.stringify({
					order: ['name', 'status', 'payment_status', 'amount'],
					display: {
						name: true,
						status: true,
						payment_status: true,
						amount: true
					}
				}));

				if (appSettings.sort_by) {
					delete appSettings.sort_by;
					delete appSettings.sort_direction;
				}

				localStorage.setItem('app-settings', JSON.stringify(appSettings));

				formPageContent.addLoadScreen();

				fetchData({
					method: 'GET',
					url: formURL(),
					callback: callbackFunc,
					headers: {
						'accept': 'application/json'
					}
				});

				function callbackFunc(data) {
					formPageContent.formColumnsFilterBar();
					formPageContent.formNavBar();
					formPageContent.formColumnHeaders();
					formPageContent.formUserList(data);
					calcfreeSpace(true);
					formPageContent.changsUserListColumns({
						setWidth: true,
						setOrder: true,
						setDisplay: true
					});
				}
				return;
			}



			function distributeFreeSpace(event) {
				columnSettings = JSON.parse(localStorage.getItem('column-settings'));
				currenColumnMinWidth = parseInt(getComputedStyle(currentColumn).minWidth, 10);
				const currentX = event.clientX;
				margin = currentX - startX;
				startX = currentX;
				if (margin >= 0) {
					if (columnSettings.free_space[currentColumnType] < maxRightFreeSpace) {
						columnSettings.free_space[currentColumnType] += margin;
						decsNextColumnFreeSpace(currentColumn);
					} else {
						columnSettings.free_space[currentColumnType] = maxRightFreeSpace;
					}
				} else {
					if (columnSettings.free_space[currentColumnType] > 0) {
						columnSettings.free_space[currentColumnType] += margin;
						acsNextColumnFreeSpace(currentColumn);
					} else {
						columnSettings.free_space[currentColumnType] = 0;
						acsNextColumnFreeSpace(currentColumn);
						decsPrevColumnFreeSpace(currentColumn);
					}
				}
				currentColumn.style.width = `${columnSettings.free_space[currentColumnType] + currenColumnMinWidth}px`;
				localStorage.setItem('column-settings', JSON.stringify(columnSettings));
			}
			
			function decsNextColumnFreeSpace(currentColumn) {
				let nextElem = findNeighborElem(currentColumn, 'next');
				if (nextElem) {
					const nextElemType = nextElem === nameColumn ? 'name' :
						nextElem === statusColumn ? 'status' :
							nextElem === paymentStatusColumn ? 'payment_status' : 'amount';
					const nextElemMinWidth = nextElemType === 'name' ? nameColumnMinWidth :
						nextElemType === 'status' ? statusColumnMinWidth :
							nextElemType === 'payment_status' ? paymentStatusColumnMinWidth : amountColumnMinWidth;
					if (columnSettings.free_space[nextElemType] > 0) {
						columnSettings.free_space[nextElemType] -= margin;
						nextElem.style.width = `${columnSettings.free_space[nextElemType] + nextElemMinWidth}px`;
					} else {
						columnSettings.free_space[nextElemType] = 0;
						nextElem.style.width = `0px`;
						decsNextColumnFreeSpace(nextElem);
					}
				}
			}

			function decsPrevColumnFreeSpace(currentColumn) {
				let prevElem = findNeighborElem(currentColumn, 'prev');
				if (prevElem) {
					const prevElemType = prevElem === nameColumn ? 'name' :
						prevElem === statusColumn ? 'status' :
							prevElem === paymentStatusColumn ? 'payment_status' : 'amount';
					const prevElemMinWidth = prevElemType === 'name' ? nameColumnMinWidth :
						prevElemType === 'status' ? statusColumnMinWidth :
							prevElemType === 'payment_status' ? paymentStatusColumnMinWidth : amountColumnMinWidth;
					if (columnSettings.free_space[prevElemType] > 0) {
						columnSettings.free_space[prevElemType] += margin;
						prevElem.style.width = `${columnSettings.free_space[prevElemType] + prevElemMinWidth}px`;
					} else {
						columnSettings.free_space[prevElemType] = 0;
						prevElem.style.width = `0px`;
						decsPrevColumnFreeSpace(prevElem);
					}
				}
			}

			function acsNextColumnFreeSpace(currentColumn) {
				let nextElem = findNeighborElem(currentColumn, 'next');
				if (nextElem) {
					const nextElemType = nextElem === nameColumn ? 'name' :
						nextElem === statusColumn ? 'status' :
							nextElem === paymentStatusColumn ? 'payment_status' : 'amount';
					const nextElemMinWidth = nextElemType === 'name' ? nameColumnMinWidth :
						nextElemType === 'status' ? statusColumnMinWidth :
							nextElemType === 'payment_status' ? paymentStatusColumnMinWidth : amountColumnMinWidth;
					if (columnSettings.free_space[nextElemType] < (maxLeftFreeSpace + startFreeSpace[nextElemType])) {
						columnSettings.free_space[nextElemType] -= margin;
						nextElem.style.width = `${columnSettings.free_space[nextElemType] + nextElemMinWidth}px`;
					} else {
						columnSettings.free_space[nextElemType] = maxLeftFreeSpace + startFreeSpace[nextElemType];
						nextElem.style.width = `${columnSettings.free_space[nextElemType] + nextElemMinWidth}px`;
					}
				}
			}

			function calcMaxFreeSpace(currentColumnType, direction) {
				let maxFreeSpace = 0;
				let currentColumnOrderIndex;
				currentColumnOrderIndex = columnSettings.order.indexOf(currentColumnType);
				if (direction === 'right') {
					while (currentColumnOrderIndex <= columnSettings.order.length - 1) {
						if (columnSettings.display[columnSettings.order[currentColumnOrderIndex]]) {
							maxFreeSpace += columnSettings.free_space[columnSettings.order[currentColumnOrderIndex]];
						}
						currentColumnOrderIndex += 1;
					}
				} else if (direction === 'left') {
					while (currentColumnOrderIndex >= 0) {
						if (columnSettings.display[columnSettings.order[currentColumnOrderIndex]]) {
							maxFreeSpace += columnSettings.free_space[columnSettings.order[currentColumnOrderIndex]];
						}
						currentColumnOrderIndex -= 1;
					}
				}
				return maxFreeSpace;
			}

			function findNeighborElem(currentColumn, side) {
				let elem;
				if (side === 'prev') {
					elem = currentColumn.previousElementSibling;
				} else if (side === 'next') {
					elem = currentColumn.nextElementSibling;
				} else return;
				if (elem) {
					if (elem.style.width !== '0px') {
						return elem;
					} else {
						return findNeighborElem(elem, side);
					}
				} else return false;
			}
		});
	}
};




export default handleNavBar ;
