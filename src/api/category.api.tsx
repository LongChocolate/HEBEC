import * as service from '@/utils/request';

export const getCategory = async (token: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.get('v1/customer/category', config);
        return res;
    } catch (response) {}
};

export const getCategoryHighLight = async (token: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.get('v1/customer/category/highlight', config);
        return res;
    } catch (response) {}
};
