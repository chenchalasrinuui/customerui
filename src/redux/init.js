import { AppCookies } from "../services/cookies";

export const init = {
    isLoggedIn: AppCookies.isUserLoggedIn(),
    cartItemsCount: 0,
    isShowLoader: false,
    toaster: {
        isShowToaster: false,
        toasterMsg: '',
        color: ''
    },
    modal: {
        isShowModal: false,
        modalAction: () => { }
    }
}