import {Order} from '@/types/order';
import {action, computed, makeObservable, observable} from 'mobx';
import {orderStore} from './OrderStore';
import * as fetchOrder from '@/api/order.api';
import {userStore} from './UserStore';

class HistoryStore {
    @observable history: Order[] = [];
    @observable currentPage: number = 1;

    constructor() {
        makeObservable(this);
    }

    @action
    setHistory = (order: Order[]) => {
        this.history = order;
    };

    @action
    updateDelivery = (order) => {};

    @action
    setPromoCode = (promoCode: string) => {};

    @action
    setPaymentMethod = (method: string) => {};

    @action
    success = () => {};

    @action
    addHistories = (history: Order[]) => {
        this.history = this.history.concat(history);
    };

    @computed
    get getHistory() {
        return this.history;
    }

    @action
    updateCurrentPage = (page: number) => {
        this.currentPage = page;
    };

    @action
    fetch = async (page: number, limit: number, ref: boolean = false) => {
        //axois
        this.updateCurrentPage(page);
        const result = await fetchOrder.getAllOrders(userStore.getToken, page, limit);
        const data = result.data.data;
        if (result.status === 200) {
            if (ref) {
                this.setHistory(data.data);
            } else {
                this.addHistories(data.data);
            }
        }

        return result;
    };

    @computed
    get getCurrentPage() {
        return this.currentPage;
    }

    @action
    getTotalProduct = (id: number) => {
        let total = 0;
        this.history.map((order) => {
            if (order.id === id) {
                total = order.orderDetails.length;
            }
        });
        return total;
    };
}

export const historyStore = new HistoryStore();
