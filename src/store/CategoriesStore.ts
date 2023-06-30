import * as categoriesApi from '@/api/category.api';

import {action, computed, makeObservable, observable} from 'mobx';
import {Category} from '@/types/categories';

class CateStore {
    @observable cate: Category[] = [];
    @observable currentPage: number = 1;
    constructor() {
        makeObservable(this);
    }

    @action
    addCates = (cate: Category[]) => {
        this.cate = this.cate.concat(cate);
    };

    @action
    setCates = (cate: Category[]) => {
        this.cate = cate;
    };

    @action
    fetch = async (token: string) => {
        const result = await categoriesApi.getCategoryHighLight(token);
        const dataRequest = result.data;

        if (result.status == 200) {
            this.setCates(dataRequest.data);
        }
        return result;
    };

    @computed
    get getCurrentPage() {
        return this.currentPage;
    }

    @computed
    get getCates() {
        return this.cate;
    }
}

export const cateStore = new CateStore();
