import * as service from '@/utils/request';

export const postOrderEstimate = async (token: string, order: any) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.post(
            'v1/customer/order/estimate',
            {
                ...order,
            },
            config,
        );
        return res;
    } catch (response) {}
};

export const postOrder = async (token: string, order: any) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.post(
            'v1/customer/order',
            {
                ...order,
            },
            config,
        );
        return res;
    } catch (response) {}
};

export const getAllOrders = async (token: string, page: number, limit: number) => {
    try {
        const config = {
            headers: {
                token: token,
            },
            params: {
                page: page,
                limit: limit,
            },
        };
        const res = await service.get('v1/customer/order', config);
        return res;
    } catch (response) {}
};

export const getOrder = async (token: string, orderId: number) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.get(`v1/customer/order/${orderId}/payment`, config);
        return res;
    } catch (response) {}
};

export const postCancelOrder = async (token: string, orderId: number) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.post(`v1/customer/order/${orderId}/cancel`, config);
        return res;
    } catch (response) {}
};
