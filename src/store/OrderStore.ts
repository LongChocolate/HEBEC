import {action, computed, makeObservable, observable} from 'mobx';

const defaultOrder = {
    details: [],
    order: {
        address: '',
        phone: '',
        name: '',
        paymentType: '',
        moneyDistance: 0,
        moneyTotal: 0,
        moneyDiscount: 0,
        moneyFinal: 0,
    },
    addressCityId: 0,
    addressDistrictId: 0,
    addressWardId: 0,
    promotionCode: '',
};
class OrderStore {
    @observable infomation = defaultOrder;

    constructor() {
        makeObservable(this);
    }

    @action
    updateForm = (form, details) => {
        this.infomation.order.address = form.address;
        this.infomation.order.phone = form.phone;
        this.infomation.order.name = form.name;

        this.infomation.addressCityId = form.idCity;
        this.infomation.addressDistrictId = form.idDistrict;
        this.infomation.addressWardId = form.idWard;

        this.infomation.details = details;
    };

    @action
    updateDelivery = (order) => {
        this.infomation.order.moneyDiscount = order.moneyDiscount;
        this.infomation.order.moneyDistance = order.moneyDistance;
        this.infomation.order.moneyTotal = order.moneyTotal;
        this.infomation.order.moneyFinal = order.moneyFinal;
    };

    @action
    setPromoCode = (promoCode: string) => {
        this.infomation.promotionCode = promoCode;
    };

    @action
    setPaymentMethod = (method: string) => {
        this.infomation.order.paymentType = method;
    };

    @action
    success = () => {
        this.infomation = defaultOrder;
    };

    @computed
    get getOrder() {
        return this.infomation;
    }

    // @computed
    // set setPromo(promo: string) {
    //     this.infomation.promotionCode = promo;
    // }
}

export const orderStore = new OrderStore();
