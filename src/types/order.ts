import {AddressCity} from './addressCity';
import {AddressDistrict} from './addressDistrict';
import {AddressWard} from './addressWard';
import {OrderDetail} from './orderDetail';
import {Promotion} from './promotion';

export interface Order {
    id: number;
    createdAt: number;
    updatedAt: number;
    isDeleted: boolean;
    note: string;
    paymentStatus: string;
    paymentType: string;
    status: string;
    code: string;
    address: string;
    phone: string;
    name: string;
    moneyDistance: number;
    moneyTotal: number;
    moneyDiscount: number;
    moneyFinal: number;
    expoToken: string;
    kvCode: string;
    kvId: string;
    // Throw error if can not approve promotion
    promotion: Promotion;
    addressWard: AddressWard;
    addressDistrict: AddressDistrict;
    addressCity: AddressCity;
    orderDetails: OrderDetail[];
}
