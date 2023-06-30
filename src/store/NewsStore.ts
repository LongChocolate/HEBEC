import {News} from '@/types/news';
import * as newsApi from '@/api/news.api';

import {action, computed, makeObservable, observable} from 'mobx';

class NewsStore {
    @observable news: News[] = [];
    @observable currentPage: number = 1;
    constructor() {
        makeObservable(this);
    }

    @action
    updateCurrentPage = (page: number) => {
        this.currentPage = page;
    };

    @action
    addNews = (news: News[]) => {
        this.news = this.news.concat(news);
    };

    @action
    removeProduct = (bookId: number) => {};

    @action
    deleteAll = () => {
        this.news = [];
    };

    @action
    setNews = (news: News[]) => {
        this.news = news;
    };

    @action
    fetch = async (page: number, limit: number, ref: boolean = false) => {
        //axois
        this.updateCurrentPage(page);
        const result = await newsApi.getNews(page, limit);
        const data = result.data.data;
        if (result.status === 200) {
            if (ref) {
                this.setNews(data.data);
            } else {
                this.addNews(data.data);
            }
        }
        return result;
    };

    @computed
    get getCurrentPage() {
        return this.currentPage;
    }

    @computed
    get getNews() {
        return this.news;
    }

    @computed
    get getHomeDisplay() {
        return this.news.length >= 5 ? this.news.slice(0, 5) : this.news;
    }
}

export const newsStore = new NewsStore();
