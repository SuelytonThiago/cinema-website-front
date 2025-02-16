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


} from './client'

const getUserLocale = () => localStorage.getItem("lang") || "pt";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080",
    params: {
        lang: getUserLocale(),
    }
})

export default {
    sessionAPI: SessionControllerApiFactory(undefined,undefined, instance),
    userAPI : UserControllerApiFactory(undefined,undefined, instance),
    authAPI : AuthControllerApiFactory(undefined,undefined, instance),
    categoryAPI : CategoryControllerApiFactory(undefined,undefined, instance),
    chairAPI : ChairControllerApiFactory(undefined,undefined, instance),
    fileAPI : FileControllerApiFactory(undefined,undefined, instance),
    movieAPI : MovieControllerApiFactory(undefined,undefined, instance),
    recoverAPI : RecoverPassControllerApiFactory(undefined,undefined, instance),
    reviewsAPI : ReviewControllerApiFactory(undefined,undefined, instance),
    ticketAPI: TicketControllerApiFactory(undefined,undefined,instance),
}