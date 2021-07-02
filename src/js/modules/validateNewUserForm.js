import fetchData from "./fetchData";
import * as formPageContent from "./formPageContent";
import formURL from "./formURL";
import { closePopup } from "./toggleNewUserPopup";

const validateNewUserForm = () => {
	const form = document.getElementById('new-user-form');
	const allInputs = form.querySelectorAll('.popup-new-user__input-wrapper');

	form.addEventListener('submit', event => {
		event.preventDefault();

		let readyToSend = true;
		let newUserData = {};
		
		allInputs.forEach(elem => {
			const input = elem.querySelector('input');
			if (!input.value) {
				elem.classList.add('error-input', 'required-alert');
				readyToSend = false;
			} else {
				elem.classList.remove('error-input', 'required-alert');
				input.id === 'new-user-name' ? newUserData.name = input.value :
					input.id === 'new-user-email' ? newUserData.email = input.value :
						(!isNaN(input.value)) ? newUserData.amount = +input.value :
							newUserData.amount = input.value;
			}

			if (input.id === 'new-user-name') {
				input.placeholder = 'Name';
			} else if (input.id === 'new-user-email') {
				input.placeholder = 'mail@mail.com';

			} else if (input.id === 'new-user-amount') {
				input.placeholder = '$0';
			}
		});

		if (readyToSend) {
			fetchData({
				url: 'https://test-assignment.bitrx24.com/user/',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'accept': 'application/json'
				},
				body: JSON.stringify(newUserData),
				callback: responseHandler
			});
		}
		newUserData = {};


		function responseHandler(data) {
			//error 422
			if (data.errors) {
				allInputs.forEach(elem => {
					const input = elem.querySelector('input');
					if (input.id === 'new-user-name' && data.errors.name) {
						input.value = '';
						input.placeholder = data.errors.name;
						elem.classList.add('error-input', 'invalid');
					} else if (input.id === 'new-user-email' && data.errors.email) {
						input.value = '';
						input.placeholder = data.errors.email;
						elem.classList.add('error-input', 'invalid');
	
					} else if (input.id === 'new-user-amount' && data.errors.amount) {
						input.value = '';
						input.placeholder = data.errors.amount;
						elem.classList.add('error-input', 'invalid');
					}
				});
			} else {// sucsess
				formPageContent.addLoadScreen();
				fetchData({
					url: formURL(),
					method: 'GET',
					headers: {
						'accept': 'application/json'
					},
					callback: callbackFunc
				});
				closePopup();

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
		}
	});

};

export default validateNewUserForm;
