import {Banner} from '@/types/Banner';
import {action, computed, makeObservable, observable} from 'mobx';
import * as bannersApi from '@/api/banner.api';
import {Pagination} from 'react-native-snap-carousel';

class BannerStore {
    @observable banner: Banner[] = [];

    constructor() {
        makeObservable(this);
    }

    @action
    setBanners = (banner: Banner[]) => {
        this.banner = banner;
    };

    @action
    getTotalProduct = (id: number) => {
        let total = 0;
        this.banner.map((item) => {
            if (item.id === id) {
            }
        });
        return total;
    };

    @action
    pagination = () => {
        return 
            
        
    };

    @action
    fetch = async () => {
        //axois
        const result = await bannersApi.getBanner();
        const data = result.data.data;
        if (result.status === 200) {
            this.setBanners(data.data);
        }
        return result;
    };

    @computed
    get getBanner() {
        return this.banner;
    }

    @computed
    get getSize() {
        return this.banner.length;
    }
}

export const bannerStore = new BannerStore();
