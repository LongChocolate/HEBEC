import {IProduct} from '@/types/product';
import {LocalStorage} from '@/utils/LocalStorage';

import {action, computed, makeObservable, observable} from 'mobx';

class CartStore {
    @observable cart: IProduct[] = [];
    @observable total = 0;
    constructor() {
        makeObservable(this);
    }

    @action
    update = (bookId: number, quantity: number) => {
        this.cart.map((prod) => {
            if (prod.bookId == bookId) {
                if (quantity == 0) {
                    this.removeProduct(bookId);
                } else {
                    prod.quantity = quantity;
                }
            }
        });
        LocalStorage.set('cart', JSON.stringify(this.cart));
    };

    @action addProduct = (product: IProduct) => {
        let isExist = false;
        let oldquantity = null;
        this.cart.map((prod) => {
            if (prod.bookId == product.bookId) {
                isExist = true;
                oldquantity = prod.quantity;
            }
        });
        if (isExist) {
            this.update(product.bookId, oldquantity + product.quantity);
        } else {
            this.cart.push(product);
        }
        LocalStorage.set('cart', JSON.stringify(this.cart));
    };

    @action
    removeProduct = (bookId: number) => {
        this.cart.map((prod, index) => {
            if (prod.bookId == bookId) {
                this.cart.splice(index, 1);
            }
        });
        LocalStorage.set('cart', JSON.stringify(this.cart));
    };

    @action
    deleteAll = () => {
        this.cart = [];
        LocalStorage.remove('cart');
    };
    @action
    setCart = (cart: IProduct[]) => {
        if (cart) {
            this.cart = cart;
        }
    };

    @action
    getAmount = (id: number) => {
        let total = 0;
        this.cart.map((product) => {
            if (product.bookId === id) {
                total = product.quantity;
            }
        });
        return total;
    };

    @computed
    get getProduct() {
        return this.cart;
    }

    @computed
    get getTotal() {
        return (this.total = this.cart.reduce((price, item) => {
            return price + item.price * item.quantity;
        }, 0));
    }

    @computed
    get getCountAll() {
        return this.cart.reduce((count, item) => {
            return count + item.quantity;
        }, 0);
    }
}

export const cartStore = new CartStore();
