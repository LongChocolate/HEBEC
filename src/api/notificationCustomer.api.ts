import * as service from '@/utils/request';

export const getNotifications = async (token: string, page: number, limit: number) => {
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
        const res = await service.get('v1/customer/notificationCustomer', config);
        return res;
    } catch (response) {}
};

export const postSeenNotification = async (token: string, notificationId: number) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.post(`/v1/customer/notificationCustomer/${notificationId}/seen`, {}, config);
        return res;
    } catch (response) {}
};

export const postSeenAll = async (token: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.post(`/v1/customer/notificationCustomer/seen/all`, {}, config);
        return res;
    } catch (response) {}
};
