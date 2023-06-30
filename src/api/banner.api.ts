import * as service from '@/utils/request';

export const getBanner = async () => {
    try {
        const res = await service.get('v1/customer/banner');
        return res;
    } catch (response) {}
};
