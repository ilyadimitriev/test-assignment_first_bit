import validateUserEdit from "./validateUserEdit";

function openUserEdit(id) {
	const userId = 'user-' +  id;
	const user = document.getElementById(userId);
	const userInfo = user.querySelector('.user-info');
	const userDetails = user.querySelector('.user-details');
	const userName = userInfo.querySelector('.user-info__name').innerText;
	const userStatus = userInfo.querySelector('.user-info__section_user-status .user-info__status');
	const paymentStatus = userInfo.querySelector('.user-info__section_payment-status .user-info__status');


	const userEdit = document.createElement('div');
	userEdit.classList.add('user-edit');
	userEdit.innerHTML = `
		<form class="user-edit__form" id="${userId}-edit-form">
			<button type="button" class="user-edit__cancel" title="Cancel edit"></button>
			<div class="user-edit__name-input-wrapper">
				<input type="text" class="user-edit__name-input" id="${userId}-name-input">
			</div>
			<div class="user-status-selector user-edit__user-status-selector">
				<input type="radio" class="user-status-selector__radio" id="${userId}-edit-active" name="${userId}-edit-user-status-radio" value="Active">
				<label for="${userId}-edit-active">Active</label>
				<input type="radio" class="user-status-selector__radio" id="${userId}-edit-inactive" name="${userId}-edit-user-status-radio" value="Inactive">
				<label for="${userId}-edit-inactive">Inactive</label>
			</div>
			<div class="payment-status-selector user-edit__payment-status-selector">
				<span>Paid</span>
				<div class="popup-selector">
					<input type="radio" class="user-status-selector__radio" id="${userId}-edit-paid" name="${userId}-edit-payment-status-radio" value="Paid">
					<label for="${userId}-edit-paid">Paid</label>
					<input type="radio" class="user-status-selector__radio" id="${userId}-edit-unpaid" name="${userId}-edit-payment-status-radio" value="Unpaid">
					<label for="${userId}-edit-unpaid">Unpaid</label>
					<input type="radio" class="user-status-selector__radio" id="${userId}-edit-overdue" name="${userId}-edit-payment-status-radio" value="Overdue">
					<label for="${userId}-edit-overdue">Overdue</label>
				</div>
			</div>
			<button type="submit" class="user-edit__submit"></button>
		</form>
	`;
	userInfo.after(userEdit);
	userEdit.querySelector('.user-edit__name-input').value = userName;

	if (userStatus.classList.contains('active')) {
		userEdit.querySelector(`#${userId}-edit-active`).checked = true;
	} else if (userStatus.classList.contains('inactive')) {
		userEdit.querySelector(`#${userId}-edit-inactive`).checked = true;
	}

	if (paymentStatus.classList.contains('paid')) {
		userEdit.querySelector(`#${userId}-edit-paid`).checked = true;
		userEdit.querySelector('.user-edit__payment-status-selector span').textContent = userEdit.querySelector(`#${userId}-edit-paid`).value;
	} else if (paymentStatus.classList.contains('unpaid')) {
		userEdit.querySelector(`#${userId}-edit-unpaid`).checked = true;
		userEdit.querySelector('.user-edit__payment-status-selector span').textContent = userEdit.querySelector(`#${userId}-edit-unpaid`).value;
	} else if (paymentStatus.classList.contains('overdue')) {
		userEdit.querySelector(`#${userId}-edit-overdue`).checked = true;
		userEdit.querySelector('.user-edit__payment-status-selector span').textContent = userEdit.querySelector(`#${userId}-edit-overdue`).value;
	}



	userInfo.classList.remove('active');
	userDetails.classList.remove('active');
	userInfo.addEventListener('transitionstart', () => {
		userEdit.addEventListener('transitionend', () => {
		}, {once: true});
		userEdit.classList.add('active');
	}, {once: true});
	
	userEdit.querySelector('.user-edit__cancel').addEventListener('mousedown', () => {
		closeUserEdit(userId);
	});	
	userEdit.querySelector('.user-edit__form').addEventListener('submit', event => {
		event.preventDefault();
		validateUserEdit(userId);
	});
}

function closeUserEdit(id, update = false) {
	const user = document.getElementById(id);
	const userInfo = user.querySelector('.user-info');
	const userEdit = user.querySelector('.user-edit');


	if (update) {
		const newName = userEdit.querySelector('.user-edit__name-input').value;
		const newPaymentStatus = userEdit.querySelector('.user-edit__payment-status-selector span').textContent;
		const newStatus = userEdit.querySelector('.user-status-selector__radio:checked').value;
		const newPaymentStatusWord = getCorrectPaymentWord(newPaymentStatus);
		let wordsArr = userInfo.querySelector('.user-info__payment-date').textContent.split(' ');
		wordsArr[0] = newPaymentStatusWord;
		
		userInfo.querySelector('.user-info__name').textContent = newName;
		userInfo.querySelector('.user-info__section_user-status span').textContent = newStatus;
		userInfo.querySelector('.user-info__section_user-status .user-info__status').classList = `user-info__status ${getUserStatus(newStatus)}`;
		userInfo.querySelector('.user-info__section_payment-status span').textContent = newPaymentStatus;
		userInfo.querySelector('.user-info__section_payment-status .user-info__status').classList = `user-info__status ${getPaymentStatus(newPaymentStatus)}`;
		userInfo.querySelector('.user-info__payment-date').textContent = wordsArr.join(' ');
		
		function getUserStatus(status) {
			return status === 'Active' ? 'active' : 'inactive';
		}
		function getPaymentStatus(status) {
			return status === 'Paid' ? 'paid' : status === 'Unpaid' ? 'unpaid' : 'overdue';
		}
		function getCorrectPaymentWord(status) {
			return status === 'Paid' ? 'Paid' : status === 'Unpaid' ? 'Dues' : 'Dued';
		}

	}

	userInfo.classList.add('active');
	userInfo.addEventListener('transitionstart', () => {
		userEdit.addEventListener('transitionend', () => {
			userEdit.remove();
		}, {once: true});
		userEdit.classList.remove('active');
	}, {once: true});
}

export { openUserEdit, closeUserEdit };
