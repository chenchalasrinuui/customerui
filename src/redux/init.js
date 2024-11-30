import { AppCookies } from "../services/cookies";

export const init = {
    isLoggedIn: AppCookies.isUserLoggedIn(),
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