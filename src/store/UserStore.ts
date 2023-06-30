import {IAuth} from '@/types/user';
import {action, computed, makeObservable, observable} from 'mobx';

class UserStore {
    @observable userStore: IAuth = {
        phone: '',
        name: '',
        address: '',
        email: '',
        gender: '',
        image: '',

        token: '',
        login: false,
    };

    constructor() {
        makeObservable(this);
    }
    @action
    update = (user: IAuth) => {
        (this.userStore.phone = user?.phone),
            (this.userStore.name = user?.name),
            (this.userStore.address = user?.address),
            (this.userStore.email = user?.email),
            (this.userStore.gender = user?.gender),
            (this.userStore.image = user?.image);
    };

    @action loginUser = () => {
        this.userStore.login = true;
    };

    @action saveToken = (token: string) => {
        this.userStore.token = token;
    };

    @action
    reset = () => {
        this.userStore = {
            phone: '',
            name: '',
            address: '',
            email: '',
            gender: '',
            image: '',

            token: '',
            login: false,
        };
    };

    @computed
    get getToken() {
        return this.userStore.token;
    }

    @computed
    get getLogin() {
        return this.userStore.login;
    }

    computed;
    get getInfo() {
        return this.userStore;
    }
}

export const userStore = new UserStore();
