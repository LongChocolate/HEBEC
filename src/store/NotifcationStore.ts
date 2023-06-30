import {NotificationCustomer} from '@/types/notificationCustomer';
import {action, computed, makeObservable, observable} from 'mobx';
import * as notiApi from '@/api/notificationCustomer.api';

class NotificationStore {
    @observable notis: NotificationCustomer[] = [];
    @observable currentPage: number = 1;

    constructor() {
        makeObservable(this);
    }

    @action
    updateCurrentPage = (page: number) => {
        this.currentPage = page;
    };
    @action
    addNotis = (notis: NotificationCustomer[]) => {
        this.notis = this.notis.concat(notis);
    };

    @action
    pushToTop = (notis: NotificationCustomer[]) => {
        this.notis = notis.concat(this.notis);
    };

    @action
    deleteAll = () => {
        this.notis = [];
    };

    @action
    setNotis = (notis: NotificationCustomer[]) => {
        this.notis = notis;
    };

    @action
    setSeen = (noteId: number) => {
        this.notis.map((noti) => {
            if (noti.id === noteId) {
                noti.isSeen = true;
            }
        });
    };

    @action
    fetch = async (page: number, limit: number, token: string, ref: boolean = false) => {
        //axois
        this.updateCurrentPage(page);
        const result = await notiApi.getNotifications(token, page, limit);
        const data = result.data.data;
        if (result.status === 200) {
            if (ref) {
                this.setNotis(data.notificationCustomers);
            } else {
                this.addNotis(data.notificationCustomers);
            }
        }
        return result;
    };

    @computed
    get getNoti() {
        return this.notis;
    }
    @computed
    get getCurrentPage() {
        return this.currentPage;
    }
}

export const notiStore = new NotificationStore();
