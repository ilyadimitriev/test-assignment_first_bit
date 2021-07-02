import fetchData from "./fetchData";
import * as formPageContent from "./formPageContent";
import formURL from "./formURL";

const handleRowsLimitPopup = () => {

	const poppup = document.querySelector('.popup-rows-limit');
	const footerRows = document.querySelector('.footer__rows');

	footerRows.addEventListener('click', event => {
		const openBtn = event.target.closest('.footer__rows-btn');
		if (openBtn) {
			openRowsLimitPopup();
			return;
		}
		const poppupBtn = event.target.closest('.popup-rows-limit__btn');
		if (poppupBtn) {
			const appSettings = JSON.parse(localStorage.getItem('app-settings'));
			if (+poppupBtn.textContent === appSettings.limit) {
				closeRowsLimitPopup();
				return;
			} else {
				handlePopupBtn(poppupBtn);
			}
		}
	});

	footerRows.addEventListener('mouseleave', () => {
		closeRowsLimitPopup();
		return;
	});

	function openRowsLimitPopup() {
		poppup.classList.add('active');
	}

	function closeRowsLimitPopup() {
		poppup.classList.remove('active');
	}

	function handlePopupBtn(targetBtn) {
		console.log('click');

		const allPopupBtns = [...document.querySelectorAll('.popup-rows-limit__btn')];
		const index = allPopupBtns.indexOf(targetBtn);

		const limit = index === 0 ? 10 :
					index === 1 ? 15 :
						index === 2 ? 20 : 30;
		
		const appSettings = JSON.parse(localStorage.getItem('app-settings'));
		appSettings.limit = limit;
		appSettings.page = 1
		localStorage.setItem('app-settings', JSON.stringify(appSettings));

		formPageContent.addLoadScreen();
		closeRowsLimitPopup();

		fetchData({
			method: 'GET',
			url: formURL(),
			callback: callbackFunc,
			headers: {
				'accept': 'application/json'
			}
		});

		function callbackFunc(data) {
			formPageContent.formUserList(data);
			formPageContent.changsUserListColumns({
				setWidth: true,
				setOrder: true,
				setDisplay: true
			});
			formPageContent.formPagination(data);
		}
	}

};

export default handleRowsLimitPopup;
