import fetchData from "./fetchData";
import * as formPageContent from "./formPageContent";
import formURL from "./formURL";

const handlePaymentStatusFilter = () => {
	const paymentStatusSelector = document.querySelector('.payment-status-selector');
	const paymentFilters = document.querySelector('.selection__payment-filters');
	const popup = document.querySelector('.popup-payment-selector');
	const popupBtns = [...popup.querySelectorAll('.popup-payment-selector__option')];

	paymentFilters.addEventListener('click', event => {
		const selectedFilterBtn = event.target.closest('.selection__payment-filters-btn');
		if (selectedFilterBtn) {
			const selectedFilterBtnType = selectedFilterBtn.textContent;
			const appSettings = JSON.parse(localStorage.getItem('app-settings'));
			appSettings.payment_status.splice(appSettings.payment_status.indexOf(selectedFilterBtnType), 1);
			if (appSettings.payment_status.length === 0) {
				delete appSettings.payment_status;
			}
			appSettings.page = 1;
			localStorage.setItem('app-settings', JSON.stringify(appSettings));
			formPageContent.formPaymentStatusFilter();
			formPageContent.addLoadScreen();
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
		openPopup();
	});

	paymentStatusSelector.addEventListener('mouseleave', () => {
		closePopup();
	});

	popup.addEventListener('change', event => {
		const targetPopupBtn = event.target.closest('.popup-payment-selector__option');
		const selectedFilters = [];
		const filterOptions = ['Paid', 'Unpaid', 'Overdue'];
		if (targetPopupBtn) {
			const appSettings = JSON.parse(localStorage.getItem('app-settings'));
			appSettings.page = 1;

			if (targetPopupBtn === popupBtns[0]) {
				if (targetPopupBtn.querySelector('input').checked) {
					popupBtns.forEach((elem, index) => {
						if (index === 0) return;
						elem.querySelector('input').checked = true;
					});
					appSettings.payment_status = filterOptions;
				} else {
					popupBtns.forEach((elem, index) => {
						if (index === 0) return;
						elem.querySelector('input').checked = false;
					});	
					delete appSettings.payment_status;
				}

			} else {
				popupBtns.forEach((elem, index) => {
					if (index === 0) return;
					if (elem.querySelector('input').checked) {
						selectedFilters.push(true);
					} else {
						selectedFilters.push(false);
					}
				});

				if (!selectedFilters.some(elem => elem === false)) {
					popupBtns[0].querySelector('input').checked = true;
					appSettings.payment_status = filterOptions;
				} else if (!selectedFilters.some(elem => elem === true)) {
					popupBtns[0].querySelector('input').checked = false;
					delete appSettings.payment_status;
				} else {
					appSettings.payment_status = filterOptions.filter((elem, index) => {
						if (selectedFilters[index] === true) return true;
					});
				}

			}
			localStorage.setItem('app-settings', JSON.stringify(appSettings));
			formPageContent.formPaymentStatusFilter();
			formPageContent.addLoadScreen();
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
	});

	function openPopup() {
		popup.classList.add('active');
	}
	function closePopup() {
		popup.classList.remove('active');
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

export default handlePaymentStatusFilter;
