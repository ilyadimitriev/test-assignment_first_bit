import fetchData from "./fetchData";
import { closeUserEdit } from "./toggleUserEdit";

const validateUserEdit = (id) => {
	const form = document.getElementById(`${id}-edit-form`);
	const nameInputWrapper = form.querySelector('.user-edit__name-input-wrapper');
	const nameInput = nameInputWrapper.querySelector('.user-edit__name-input');
	const statusRadio = form.querySelector('.user-edit__user-status-selector');
	const activeStatusRadio = document.getElementById(`${id}-edit-active`);
	const paymentStatusSelector = form.querySelector('.user-edit__payment-status-selector');
	const intId = +id.replace(/[\D]/gi, '');

	let editData = {};

	editData.name = nameInput.value;
	editData.status = activeStatusRadio.checked ? true : false;
	editData.payment_status = paymentStatusSelector.querySelector('span').textContent;

	
	fetchData({
		url: `https://test-assignment.bitrx24.com/user/${intId}/`,
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'accept': 'application/json'
		},
		body: JSON.stringify(editData),
		callback: responseHandler
	});

	function responseHandler(data) {
		//error 422
		if (data.errors) {
			if (data.errors.name){
				nameInput.value = '';
				nameInput.placeholder = data.errors.name;
				nameInputWrapper.classList.add('error-input', 'invalid');
			} else {
				nameInput.placeholder = 'Name';
				nameInputWrapper.classList.remove('error-input', 'invalid');
			}
			if (data.errors.status) {
				statusRadio.classList.add('error-input');
			} else {
				statusRadio.classList.remove('error-input');
			}
			if (data.errors.payment_status) {
				paymentStatusSelector.classList.add('error-input');
			} else {
				paymentStatusSelector.classList.remove('error-input');
			}
		} else {// sucsess
			closeUserEdit(id, true);
		}
	}

};

export default validateUserEdit;
