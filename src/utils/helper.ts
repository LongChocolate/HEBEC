// import moment from 'moment';
// import * as ImageManipulator from 'expo-image-manipulator';
// import VnpayMerchant from 'react-native-vnpay-merchant';
import {colors} from '@/styles/theme';
import {OrderStatus, PaymentType} from './enum';
import moment from 'moment';
export function transferPaymentMethod(type: string): string {
    switch (type) {
        case PaymentType.Cash:
            return 'Tiền mặt';
        case PaymentType.ViettelPay:
            return 'Ví Viettel Pay';
        default:
            return '';
    }
}

export function transferOrderStatus(status: string): string {
    switch (status) {
        case OrderStatus.Pending:
            return 'Chờ xác nhận';
            break;
        case OrderStatus.Complete:
            return 'Đã giao';
            break;
        case OrderStatus.Package:
            return 'Đóng gói';
            break;
        case OrderStatus.Cancel:
            return 'Đã huỷ';
            break;
        case OrderStatus.Delivering:
            return 'Đang vận chuyển';
            break;
        default:
            return '';
            break;
    }
}

export function formatPrice(price: number): string {
    if (price === 0) {
        return '0 đ';
    }
    var result = '';
    var dot = 0;
    while (price > 0) {
        if (dot === 3) {
            result = '.' + result;
            dot = 0;
        }
        result = (price % 10) + result;
        price = Math.floor(price / 10);

        dot++;
    }
    result += ' đ';
    return result;
}

export const transferDate = (timestamp: number) => {
    return moment.unix(timestamp).format('HH:mm, DD/MM/YYYY');
};
/**
 * ==============================================================================
 * ====================================STRING====================================
 * ==============================================================================
 */

/**
 * random string.
 * Example: randomString(5);       // '12h3g'
 *          randomString(10);    // '3HJ12i3hja'
 */
export function randomString(length: number): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * format so dien thoai.
 * Example: formatToPhone('0972485601');       // '0972 485 601'
 */
export function formatToPhone(text: string): string {
    const input = text.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
    const zip = input.substring(0, 4);
    const middle = input.substring(4, 7);
    const last = input.substring(7, 10);

    if (input.length > 7) {
        return `${zip} ${middle} ${last}`;
    } else if (input.length > 4) {
        return `${zip} ${middle}`;
    } else if (input.length > 0) {
        return `${zip}`;
    }

    return '';
}

export function maskPhoneNumber(text: string): string {
    return text.replace(text.substring(0, 6), '*** *** ');
}

export const isNumberPhoneVN = (phone: string) => {
    const regex = /((03|04|05|07|08|09)+([0-9]{8})\b)/g;
    return regex.test(phone);
};

export function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}

export const insertAt = (str: string | any[], sub: any, pos: any) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

/**
 * ==============================================================================
 * ====================================NUMBER====================================
 * ==============================================================================
 */

/**
 * rút gọn số.
 * Example: convertShortNumber(1000);       // '1K'
 *          convertShortNumber(1230, 1);    // '1.2K'
 *          convertShortNumber(1230, 2);    // '1.23K'
 */
export function convertShortNumber(num: number, digits = 1): string {
    var si = [
        {value: 1, symbol: ''},
        {value: 1e3, symbol: 'K'},
        {value: 1e6, symbol: 'M'},
        {value: 1e9, symbol: 'G'},
        {value: 1e12, symbol: 'T'},
        {value: 1e15, symbol: 'P'},
        {value: 1e18, symbol: 'E'},
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}

/**
 * Format number.
 * Example: formatNumber(1000);       // '1.000'
 *          convertShortNumber(1230.344, 1);    // '1.230,3'
 *          convertShortNumber(1230.344, 1, '.', ',');    // '1,230.3'
 */
export function formatNumber(amount: any, decimalCount = 0, decimal = ',', thousands = '.'): string {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? '-' : '';

        let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
            (decimalCount
                ? decimal +
                  Math.abs(amount - Number(i))
                      .toFixed(decimalCount)
                      .slice(2)
                : '')
        );
    } catch (e) {
        return '';
    }
}

/**
 * ==============================================================================
 * ====================================FORMAT====================================
 * ==============================================================================
 */

// Code here

/**
 * ==============================================================================
 * ====================================OBJECT====================================
 * ==============================================================================
 */

// Code here

/**
 * ==============================================================================
 * ====================================ARRAY====================================
 * ==============================================================================
 */

export function formatRow<S extends {key?: string; empty?: boolean}>(data: S[], numColumns: number) {
    const arr = [...data];
    const numberOfFullRows = Math.floor(arr.length / numColumns);
    let numberOfElementsLastRow = arr.length - numberOfFullRows * numColumns;
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        let obj: any = {key: `blank-${numberOfElementsLastRow}`, empty: true};
        arr.push(obj);
        numberOfElementsLastRow++;
    }
    return arr;
}

/**
 * ==============================================================================
 * ====================================TIME====================================
 * ==============================================================================
 */

export function formatDate(timestamp: number, format = 'DD/MM/YYYY'): string {
    return moment.unix(timestamp).format(format);
}

export function formatDateTime(timestamp: number): string {
    return moment.unix(timestamp).format('HH:mm, DD/MM/YYYY');
}

export function formatDateDay(timestamp: number): string {
    return moment.unix(timestamp).format('dddd, MM/DD/YYYY');
}

export function getCurrentTimeInt(): number {
    return +(moment().valueOf() / 1000).toFixed();
}

export function getTimeFromNow(date: number): string {
    return moment.unix(date).fromNow();
}

/**
 * ==============================================================================
 * ====================================UTILITY====================================
 * ==============================================================================
 */

/**
 * Convert string to array LatLong. Use for google map api.
 * Example: decodeDirection('asojdhljqh35u9raydjasd');       // [{latitude: 31424, long: 234234}]
 */
export function decodeDirection(t: string, e?: any) {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length; ) {
        (a = null), (h = 0), (i = 0);
        do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
        while (a >= 32);
        (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
        do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
        while (a >= 32);
        (o = 1 & i ? ~(i >> 1) : i >> 1), (l += n), (r += o), d.push([l / c, r / c]);
    }

    return (d = d.map(function (t) {
        return {
            latitude: t[0],
            longitude: t[1],
        };
    }));
}

/**
 * Convert array LatLong to url string. Use for google map api.
 * Example: convertLatLongToUrl([{lat: 31424, long: 234234}]);       // '31424,234234'
 */
export function convertLatLongToUrl(arr: any[]): string {
    let str = '';
    arr.map((item) => {
        str += `${item.lat},${item.long}|`;
    });
    str = str.slice(0, -1);

    return str;
}

/**
 * Convert m to km.
 * Example: metterToKm(1000);       // 1
 */
export function metterToKm(n: number) {
    if (isNaN(n)) return 0;
    return Number(Number.parseFloat((n / 1000).toString()).toPrecision(2));
}

/**
 * Compress image
 */
export async function compressImage(image: string, actions?: ImageManipulator.Action[], compress = 0.7) {
    const manipResult = await ImageManipulator.manipulateAsync(image, actions, {
        compress,
        format: ImageManipulator.SaveFormat.PNG,
    });
    return manipResult;
}

export const openVnPay = (paymentUrl: string) => {
    VnpayMerchant.show({
        scheme: 'hebecschool',
        isSandbox: false,
        paymentUrl,
        tmn_code: 'HEBEC001',
        backAlert: 'Bạn có chắc chắn trở lại ko?',
        title: 'Thanh toán',
        iconBackName: 'ion_back',
        beginColor: colors.primary,
        endColor: colors.primary,
        titleColor: '#ffffff',
    });
};
