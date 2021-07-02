const toggleSelectionBar = () => {
	const filterBtn = document.querySelector('.header__filter');
	const selectionBar = document.querySelector('.selection');

	filterBtn.addEventListener('click', () => {
		if (filterBtn.classList.contains('active')) {
			filterBtn.classList.toggle('active');
			selectionBar.classList.toggle('active');
		} else {
			filterBtn.classList.toggle('active');
			selectionBar.classList.toggle('active');
		}
	});
};

export default toggleSelectionBar;