import * as service from '@/utils/request';

export const getGrades = async (token: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.get('v1/customer/grade', config);
        return res;
    } catch (response) {}
};
