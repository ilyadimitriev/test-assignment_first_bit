const toggleNewUserPopup = () => {
	const newUserPopup = document.querySelector('.popup-new-user');
	const popup = document.querySelector('.popup');
	const openBtn = document.querySelector('.header-btns__add-btn');

	openBtn.addEventListener('click', () => {
		if (newUserPopup.classList.contains('active')) return;
		newUserPopup.style.transition = '300ms';
		newUserPopup.classList.add('active');
		popup.classList.add('active');
		openBtn.classList.add('active');
	});

	popup.addEventListener('mousedown', event => {
		const target = event.target.closest('.popup-new-user');
		const closeBtn = event.target.closest('.popup-new-user__close');

		if (!target || closeBtn) {
			closePopup();
		}
	});
};

function closePopup() {
	const newUserPopup = document.querySelector('.popup-new-user');
	const popup = document.querySelector('.popup');
	const openBtn = document.querySelector('.header-btns__add-btn');

	newUserPopup.classList.remove('active');
	openBtn.classList.remove('active');
	newUserPopup.addEventListener('transitionend', () => {
		popup.classList.remove('active');
		clearForm();
	}, {once: true});

	function clearForm() {
		newUserPopup.querySelectorAll('.popup-new-user__input-wrapper').forEach(elem => {
			const input = elem.querySelector('input');
			input.value = '';
			elem.classList = 'popup-new-user__input-wrapper';
			if (input.id === 'new-user-name') {
				input.placeholder = 'Name';
			} else if (input.id === 'new-user-email') {
				input.placeholder = 'mail@mail.com';

			} else if (input.id === 'new-user-amount') {
				input.placeholder = '$0';
			}
		});

	}

}

export  {toggleNewUserPopup, closePopup};
