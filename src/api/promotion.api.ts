import * as service from '@/utils/request';

export const getPromotion = async (token: string, search: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
            // params: {
            //     search: search,
            // },
        };
        const res = await service.get('v1/customer/promotion', config);
        return res;
    } catch (response) {}
};
