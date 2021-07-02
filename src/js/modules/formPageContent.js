import formDate from "./formDate";
import removeMultiUserCheck from "./removeMultiUserCheck";

function addLoadScreen() {
	const main = document.querySelector('.main');
	const loadImg = document.createElement('div');
	loadImg.classList.add('main__onload-screen', 'onload');
	loadImg.innerHTML = `
		<div id="floatingCirclesG">
			<div class="f_circleG" id="frotateG_01"></div>
			<div class="f_circleG" id="frotateG_02"></div>
			<div class="f_circleG" id="frotateG_03"></div>
			<div class="f_circleG" id="frotateG_04"></div>
			<div class="f_circleG" id="frotateG_05"></div>
			<div class="f_circleG" id="frotateG_06"></div>
			<div class="f_circleG" id="frotateG_07"></div>
			<div class="f_circleG" id="frotateG_08"></div>
		</div>
	`;
	main.prepend(loadImg.cloneNode(true));
	main.classList.add('onload');
}

function addNothingFoundScreen() {
	const main = document.querySelector('.main');
	const loadImg = document.createElement('div');
	loadImg.classList.add('main__nothing-found', 'nothing-found');
	loadImg.innerHTML = `
		<p>Nothing found<p>
	`;
	main.prepend(loadImg.cloneNode(true));
	main.classList.add('nothing-found');
}

function formUserList(data) {
	removeMultiUserCheck();
	if (!data || data.errors) return;

	let userElem = document.createElement('div');
	userElem.classList.add('user');
	let userInfo = document.createElement('div');
	userInfo.classList.add('user-info', 'active');
	let userDetails = document.createElement('div');
	userDetails.classList.add('user-details');
	let main = document.querySelector('.main');

	let status;
	let payment_status;

	main.innerHTML = ``;
	main.classList.remove('onload', 'nothing-found');

	if (data.data.length === 0) {
		addNothingFoundScreen();
		return;
	}

	// формирую список пользователей
	data.data.forEach(user => {
		status = getUserStatus(user.status);
		payment_status = getPaymentStatus(user.payment_status);

		userElem.id = 'user-' +  user.id;
		userInfo.innerHTML = `
		<div class="user-info__wrapper">
			<div class="user-info__section user-info__section_check">
				<label class="checkbox-main"><input type="checkbox" name="user-checkbox" id ="user-${user.id}-checkbox"><span></span></label>
				<button class="user-info__show-more"></button>
			</div>
			<div class="user-info__section-wrapper">
				<div class="user-info__section user-info__section_resizeble user-info__section_name">
					<span class="user-info__name">${user.name}</span>
					<span class="user-info__email">${user.email}</span>
				</div>
				<div class="user-info__section user-info__section_resizeble user-info__section_user-status">
					<div class="user-info__status ${status}">
						<svg width="6" height="6" >
							<circle class="icon__status" cx="3" cy="3" r="3"></circle>
						</svg>
						<span>${status}</span>
					</div>
					<span class="user-info__last-login">Last login: ${formDate(user.last_login)}</span>
				</div>
				<div class="user-info__section user-info__section_resizeble user-info__section_payment-status">
					<div class="user-info__status ${payment_status}">
						<svg class="icon__status" width="6" height="6" >
							<circle cx="3" cy="3" r="3"></circle>
						</svg>
						<span>${payment_status}</span>
					</div>
					<span class="user-info__payment-date">${getCorrectPaymentWord(user.payment_status)} on ${formDate(user.due_date)}</span>
				</div>
				<div class="user-info__section user-info__section_resizeble user-info__section_amount">
					<span class="user-info__amount">$${user.amount}</span>
					<span class="user-info__currency">${user.currency}</span>
				</div>
			</div>
			<div class="user-info__section user-info__section_options">
				<button class="user-info__btn-options">
					<svg class="icon__dot" width="4" height="4" >
						<circle cx="2" cy="2" r="2"></circle>
					</svg>
					<svg class="icon__dot" width="4" height="4">
						<circle cx="2" cy="2" r="2"></circle>
					</svg>
					<svg class="icon__dot" width="4" height="4">
						<circle cx="2" cy="2" r="2"></circle>
					</svg>
				</button>
				<div class="popup-options">
					<button class="popup-options__btn popup-options__edit"><span>Edit</span></button>
					<div class="popup-options__borderline"></div>
					<button class="popup-options__btn popup-options__delete"><span>Delete</span></button>
				</div>
			</div>
		</div>
		`;
		
		userDetails.innerHTML = `
			<div class="user-details__bar user-details__headers">
				<div class="user-details__section user-details__section-date">
					<h4 class="user-details__header">Date</h4>
				</div>
				<div class="user-details__section user-details__section-activity">
					<h4 class="user-details__header">Activity</h4>
				</div>
				<div class="user-details__section user-details__section-detail">
					<h4 class="user-details__header">Detail</h4>
					<div class="popup-details">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget.</div>
				</div>
			</div>
		`;
		if (user.activities.length !== 0) {
			const userDetailsBar = document.createElement('div');
			userDetailsBar.classList.add('user-details__bar');
			const sortByDate = user.activities.sort((a, b) => b.date - a.date);
			sortByDate.forEach(elem => {
				userDetailsBar.id = 'activity-' + elem.id;
				userDetailsBar.innerHTML = `
					<div class="user-details__section user-details__section-date"><p class="user-details__text">${formDate(elem.date)}</p></div>
					<div class="user-details__section user-details__section-activity"><p class="user-details__text">${elem.activity}</p></div>
					<div class="user-details__section user-details__section-detail"><p class="user-details__text">${elem.detail}</p></div>
				`;
				userDetails.append(userDetailsBar.cloneNode(true));
				userDetailsBar.innerHTML = ``;
			});
		} else {
			userDetails.innerHTML = `
				${userDetails.innerHTML}
				<div class="user-details__bar no-data">
					<span class="user-details__no-data">No records found</span>
				</div>
			`;
		}


		userElem.append(userInfo.cloneNode(true));
		userInfo.innerHTML = ``;
		userElem.append(userDetails.cloneNode(true));
		userDetails.innerHTML = ``;
		main.append(userElem.cloneNode(true));
		userElem.innerHTML = ``;
	});

	function getUserStatus(status) {
		return status ? 'active' : 'inactive';
	}
	function getPaymentStatus(status) {
		return status === 'Paid' ? 'paid' : status === 'Unpaid' ? 'unpaid' : 'overdue';
	}
	function getCorrectPaymentWord(status) {
		return status === 'Paid' ? 'Paid' : status === 'Unpaid' ? 'Dues' : 'Dued';
	}
};

function changsUserListColumns({setWidth = false, setOrder = false, setDisplay = false}) {
	const loadScreen = document.querySelector('.main__onload-screen');
	if (loadScreen) {
		loadScreen.remove();
		document.querySelector('.main').classList.remove('onload');
	}

	if (setWidth || setOrder || setDisplay) {

		const allUsers = document.querySelectorAll('.user-info__section-wrapper');
		const columnSettings = JSON.parse(localStorage.getItem('column-settings'));
	
		allUsers.forEach(user => {
			const nameColumn = user.querySelector('.user-info__section_name');
			const statusColumn = user.querySelector('.user-info__section_user-status');
			const paymentStatusColumn = user.querySelector('.user-info__section_payment-status');
			const amountColumn = user.querySelector('.user-info__section_amount');
	
			if (setDisplay) {
				for (let key in columnSettings.display) {
					const currentColumn = key === 'name' ? nameColumn :
						key === 'status' ? statusColumn :
							key === 'payment_status' ? paymentStatusColumn : amountColumn;
					if (columnSettings.display[key]) {
						currentColumn.classList.remove('hidden');
					} else {
						currentColumn.classList.add('hidden');
					}
				}
			}

			if (setWidth) {
				for (let key in columnSettings.free_space) {
					const currentColumn = key === 'name' ? nameColumn :
						key === 'status' ? statusColumn :
							key === 'payment_status' ? paymentStatusColumn : amountColumn;
					
					currentColumn.style.width = parseInt(getComputedStyle(currentColumn).minWidth, 10) + columnSettings.free_space[key] + 'px';
				}
			}
	
			if (setOrder) {
				columnSettings.order.forEach(elem => {
					const currentColumn = elem === 'name' ? nameColumn :
						elem === 'status' ? statusColumn :
							elem === 'payment_status' ? paymentStatusColumn : amountColumn;
					const columnCope = currentColumn.cloneNode(true);
					currentColumn.remove();
					user.append(columnCope);
				});
			}
		});
	}

}

function formColumnsFilterBar() {
	const columnsFilterBar = document.querySelector('.column-settings');
	const columnsWrapper = columnsFilterBar.querySelector('.column-settings__columns-wrapper');
	const columnSettings = JSON.parse(localStorage.getItem('column-settings'));
	if (columnSettings) {
		const nameColumn = columnsFilterBar.querySelector('.column-box_name');
		const statusColumn = columnsFilterBar.querySelector('.column-box_status');
		const paymentStatusColumn = columnsFilterBar.querySelector('.column-box_payment-status');
		const amountColumn = columnsFilterBar.querySelector('.column-box_amount');
		if (columnSettings.display) {
			for (let key in columnSettings.display) {
				const currentColumn = key === 'name' ? nameColumn :
					key === 'status' ? statusColumn :
						key === 'payment_status' ? paymentStatusColumn : amountColumn;
				const eyeBtn = currentColumn.querySelector('.column-box__display-btn');
				if (columnSettings.display[key]) {
					eyeBtn.classList.add('on');
					eyeBtn.classList.remove('off');
				} else {
					eyeBtn.classList.remove('on');
					eyeBtn.classList.add('off');
				}
			}
		}

		if (columnSettings.order) {
			columnSettings.order.forEach(elem => {
				const currentColumn = elem === 'name' ? nameColumn :
					elem === 'status' ? statusColumn :
						elem === 'payment_status' ? paymentStatusColumn : amountColumn;
				const headerCopy = currentColumn.cloneNode(true);
				currentColumn.remove();
				columnsWrapper.append(headerCopy);
			});
		}
	}
}

function formNavBar() {
	const navBar = document.querySelector('.bar__section-wrapper');
	const columnSettings = JSON.parse(localStorage.getItem('column-settings'));
	if (columnSettings) {
		const nameColumn = navBar.querySelector('.bar__section_name');
		const statusColumn = navBar.querySelector('.bar__section_user-status');
		const paymentStatusColumn = navBar.querySelector('.bar__section_payment-status');
		const amountColumn = navBar.querySelector('.bar__section_amount');

		if (columnSettings.display) {
			for (let key in columnSettings.display) {
				const currenColumn = key === 'name' ? nameColumn :
					key === 'status' ? statusColumn :
						key === 'payment_status' ? paymentStatusColumn : amountColumn;
				if (columnSettings.display[key]) {
					currenColumn.classList.remove('hidden');
				} else {
					currenColumn.classList.add('hidden');
				}
			}
		}

		if (columnSettings.free_space) {
			for (let key in columnSettings.free_space) {
				const currentColumn = key === 'name' ? nameColumn :
					key === 'status' ? statusColumn :
						key === 'payment_status' ? paymentStatusColumn : amountColumn;
				
				currentColumn.style.width = parseInt(getComputedStyle(currentColumn).minWidth, 10) + columnSettings.free_space[key] + 'px';
			}
		}

		if (columnSettings.order) {
			const visibleColumns = columnSettings.order.filter(elem => {
				if (columnSettings.display[elem] === true) return true;
			});

			columnSettings.order.forEach((elem, index) => {
				const currenColumn = elem === 'name' ? nameColumn :
					elem === 'status' ? statusColumn :
						elem === 'payment_status' ? paymentStatusColumn : amountColumn;

				const widthSlider = currenColumn.querySelector('.bar__width-slider');
				widthSlider.classList.remove('hidden');
				if (elem === visibleColumns[visibleColumns.length - 1]) {
					widthSlider.classList.add('hidden');
				}

				const headerCopy = currenColumn.cloneNode(true);
				currenColumn.remove();
				navBar.append(headerCopy);
			});
		}
	}
}

function formPaymentStatusFilter() {
	const paymentFilters = document.querySelector('.selection__payment-filters');
	const appSettings = JSON.parse(localStorage.getItem('app-settings'));
	paymentFilters.innerHTML = '';
	
	document.querySelector('input[name=payment-selector-input][value=Paid]').checked = false;
	document.querySelector('input[name=payment-selector-input][value=Unpaid]').checked = false;
	document.querySelector('input[name=payment-selector-input][value=Overdue]').checked = false;
	document.querySelector('input[name=payment-selector-input][value=All]').checked = false;

	if (appSettings.payment_status) {
		appSettings.payment_status.forEach(elem => {
			const filter = document.createElement('button');
			filter.classList.add('selection__payment-filters-btn');
			filter.textContent = elem;
			paymentFilters.append(filter.cloneNode(true));
			document.querySelector(`input[name=payment-selector-input][value=${elem}]`).checked = true;
		});
		if (appSettings.payment_status.length === 3) {
			document.querySelector('input[name=payment-selector-input][value=All]').checked = true;
		}
	} else {
		paymentFilters.innerHTML = '<span>Select Payment status</span>';
	}
}

function formUserStatusFilter() {
	const filters = [...document.querySelectorAll('.user-status-selector__input')];
	const appSettings = JSON.parse(localStorage.getItem('app-settings'));
	if (appSettings.status === true || appSettings.status === false) {
		if (appSettings.status === true) {
			filters[0].checked = true;
		} else {
			filters[1].checked = true;
		}
	} else return;

}

function formPagination(data) {
	const footer = document.querySelector('.footer');
	const usersShown = footer.querySelector('.footer__users-shown');
	const usersTotal = footer.querySelector('.footer__users-total');
	const rowsLimit = footer.querySelector('.footer__rows-limit');
	const pagination = footer.querySelector('.pagination');
	let appSettingsChanged = false;

	pagination.innerHTML = '';

	const appSettings = JSON.parse(localStorage.getItem('app-settings'));
	if (!appSettings.page) {
		appSettings.page = data.current_page;
		appSettingsChanged = true;
	}
	if (!appSettings.limit) {
		appSettings.limit = data.per_page;
		appSettingsChanged = true;
	}
	if (appSettingsChanged) {
		localStorage.setItem(`app-settings`, JSON.stringify(appSettings));
	}

	data.links.forEach( elem => {

		const paginationBtn = document.createElement('button');
		paginationBtn.classList.add('pagination__btn');
		paginationBtn.setAttribute('data-url', elem.url);
		

		paginationBtn.innerHTML = elem.label;
		if (elem.active) {
			paginationBtn.classList.add('active');
		}
		if (elem.url === null) {
			paginationBtn.classList.add('empty');
		}
		pagination.append(paginationBtn);
	});

	rowsLimit.textContent = data.per_page;
	usersShown.textContent = `${data.from ? data.from : 0}-${data.to ? data.to : 0}`;
	usersTotal.textContent = data.total;
}

function formColumnHeaders() {
	let appSettings = localStorage.getItem('app-settings');
	appSettings = JSON.parse(appSettings);

	if (appSettings.sort_by) {
		const columnHeader = document.querySelector(`.bar__header-${appSettings.sort_by}`);
		columnHeader.classList.add('focus');
		if (appSettings.sort_direction === 'asc'){
			columnHeader.classList.add('ascending');
		} else {
			columnHeader.classList.add('descending');
		}
	} else {
		const focusedHeader = document.querySelector('.bar__header.focus');
		if (focusedHeader) {
			focusedHeader.classList.remove('focus', 'ascending', 'descending');
		}
	}

}


export { formUserList, formPagination, formColumnHeaders, addLoadScreen, addNothingFoundScreen, formPaymentStatusFilter, formUserStatusFilter, formNavBar, formColumnsFilterBar, changsUserListColumns };
