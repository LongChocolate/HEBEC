import * as service from '@/utils/request';

export const getNews = async (page, limit) => {
    try {
        const config = {
            params: {
                page: page,
                limit: limit,
            },
        };
        const res = await service.get('v1/customer/news', config);
        return res;
    } catch (response) {}
};

export const getNewsId = async (newsId: number) => {
    try {
        const config = {};
        const res = await service.get(`v1/customer/news/${newsId}`, config);
        return res;
    } catch (response) {}
};
