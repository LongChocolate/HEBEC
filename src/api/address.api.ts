import * as service from '@/utils/request';

export const getAddressCity = async (token: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
            params: {
                page: 1,
                limit: 63,
            },
        };
        const res = await service.get('v1/customer/addressCity', config);
        return res;
    } catch (response) {}
};

export const getAddressDistrict = async (token: string, code: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
            params: {
                page: 1,
                limit: 50,
                parentCode: code,
            },
        };
        const res = await service.get('v1/customer/addressDistrict', config);
        return res;
    } catch (response) {}
};

export const getAddressWard = async (token: string, code: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
            params: {
                page: 1,
                limit: 50,
                parentCode: code,
            },
        };
        const res = await service.get('v1/customer/addressWard', config);
        return res;
    } catch (response) {}
};
