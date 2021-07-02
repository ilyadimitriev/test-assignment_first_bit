const toggleColumnsFilterBar = () => {
	const columnsBtn = document.querySelector('.header-btns__columns-btn');
	const columnSettingsBar = document.querySelector('.column-settings');

	columnsBtn.addEventListener('click', () => {
		if (columnsBtn.classList.contains('active')) {
			columnsBtn.classList.remove('active');
			columnSettingsBar.classList.remove('active');
		} else {
			columnsBtn.classList.add('active');
			columnSettingsBar.classList.add('active');
		}
	});
};

export default toggleColumnsFilterBar;
