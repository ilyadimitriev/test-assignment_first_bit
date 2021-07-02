import fetchData from "./fetchData";
import * as formPageContent from "./formPageContent";
import formURL from "./formURL";

const handlePagination = () => {
	const pagination = document.querySelector('.pagination');

	pagination.addEventListener('click', event => {
		const target = event.target.closest('.pagination__btn');
		if (target) {
			if (target.classList.contains('active')) return;
			const url = target.getAttribute('data-url');
			if (url === 'null') return;
			
			const appSettings = JSON.parse(localStorage.getItem('app-settings'));
			appSettings.page = +url.match(/\d+$/);
			localStorage.setItem(`app-settings`, JSON.stringify(appSettings));
			
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
	});
};

export default handlePagination;
