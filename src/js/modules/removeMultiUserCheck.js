const removeMultiUserCheck = () => {
	if (document.querySelector('input[name="user-checkbox"]:checked')) {
		const popup = document.querySelector('.popup-multi_data_change');
		const activeCheckBoxes = [...document.querySelectorAll('input[name="user-checkbox"]:checked')];
		activeCheckBoxes.forEach(elem => {
			elem.checked = false;
		});
		popup.classList.remove('active');
	}
};

export default removeMultiUserCheck;
