import axios from "axios";
import {
    SessionControllerApiFactory,
    UserControllerApiFactory,
    AuthControllerApiFactory,
    CategoryControllerApiFactory,
    ChairControllerApiFactory,
    FileControllerApiFactory,
    MovieControllerApiFactory,
    RecoverPassControllerApiFactory,
    ReviewControllerApiFactory,
    TicketControllerApiFactory,
} from './client';

import store from "../src/redux/store";
import {showLoginModal} from '../src/redux/show-login-modal/actions';

const getUserLocale = () => localStorage.getItem("lang") || "pt";


const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080",
    params: {
        lang: getUserLocale(),
    }
});


instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403) {
            store.dispatch(showLoginModal());
        }

        return Promise.reject(error);
    }
);

export default {
    sessionAPI: SessionControllerApiFactory(undefined, undefined, instance),
    userAPI: UserControllerApiFactory(undefined, undefined, instance),
    authAPI: AuthControllerApiFactory(undefined, undefined, instance),
    categoryAPI: CategoryControllerApiFactory(undefined, undefined, instance),
    chairAPI: ChairControllerApiFactory(undefined, undefined, instance),
    fileAPI: FileControllerApiFactory(undefined, undefined, instance),
    movieAPI: MovieControllerApiFactory(undefined, undefined, instance),
    recoverAPI: RecoverPassControllerApiFactory(undefined, undefined, instance),
    reviewsAPI: ReviewControllerApiFactory(undefined, undefined, instance),
    ticketAPI: TicketControllerApiFactory(undefined, undefined, instance),
};
