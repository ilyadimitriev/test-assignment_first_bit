import '../css/reset.css';
import '../less/style.less';
import handleColumnsFilter from './modules/handleColumnsFilter';
import handleNavBar from './modules/handleNavBar';
import handleMultiChangePopup from './modules/handleMultiChangePopup';
import handleMultiUserCheck from './modules/handleMultiUserCheck';
import handlePagination from './modules/handlePagination';
import handlePaymentStatusFilter from './modules/handlePaymentStatusFilter';
import handleRowsLimitPopup from './modules/handleRowsLimitPopup';
import handleSeacrh from './modules/handleSearch';
import handleUserStatusFilter from './modules/handleUserStatusFilter';
import toggleColumnsFilterBar from './modules/toggleColumnsFilterBar';
import toggleDetailHint from './modules/toggleDetailHint';
import {toggleNewUserPopup} from './modules/toggleNewUserPopup';
import handleOptionsPopup from './modules/handleOptionsPopup';
import toggleSelectionBar from './modules/toggleSelectionBar';
import toggleSelectorPopup from './modules/toggleSelectorPopup';
import toggleUserDetails from './modules/toggleUserDetails';
import updateAppOnload from './modules/updateAppOnload';
import validateNewUserForm from './modules/validateNewUserForm';


window.addEventListener(`DOMContentLoaded`, () => {


updateAppOnload();

toggleSelectionBar();
toggleUserDetails();
toggleDetailHint();
toggleColumnsFilterBar();
toggleSelectorPopup();
toggleNewUserPopup();
validateNewUserForm();

handlePagination();
handleOptionsPopup();
handleColumnsFilter();
handleNavBar();
handlePaymentStatusFilter();
handleUserStatusFilter();
handleRowsLimitPopup();
handleSeacrh();
handleMultiUserCheck();
handleMultiChangePopup();

});