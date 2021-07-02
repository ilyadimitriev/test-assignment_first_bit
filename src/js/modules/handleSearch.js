import fetchData from "./fetchData";
import * as formPageContent from "./formPageContent";
import formURL from "./formURL";

const handleSeacrh = () => {
	const searchInput = document.getElementById('main-search');
	const closeBtn = document.querySelector('.header__search-close');

	throttle(search, 700);
	closeBtn.addEventListener('mousedown', clearInput);



	function throttle(fn, delay) {
		let isThrottled = false,
			savedArgs,
			savedThis;
		const wrapper = (...args) => {
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
		};
		searchInput.addEventListener('input', wrapper);
	}
	
	function search() {
		const appSettings = JSON.parse(localStorage.getItem('app-settings'));
		appSettings.page = 1
		if (searchInput.value !== '') {
			appSettings.q = searchInput.value;
			closeBtn.classList.add('active');
		} else {
			delete appSettings.q;
			closeBtn.classList.remove('active');
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
			formPageContent.formUserList(data);
			formPageContent.changsUserListColumns({
				setWidth: true,
				setOrder: true,
				setDisplay: true
			});
			formPageContent.formPagination(data);
		}

	}
	function clearInput() {
		searchInput.value = '';
		search();
	}
};

export default handleSeacrh;
