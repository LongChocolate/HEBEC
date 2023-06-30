import * as service from '@/utils/request';

export const getAllBooks = async (token: string, page: number, limit: number) => {
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
        const res = await service.get('v1/customer/book', config);
        return res;
    } catch (response) {}
};

export const getBookDetail = async (token: string, patch: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.get(`v1/customer/book/${patch}`, config);
        return res;
    } catch (response) {}
};

export const getBooksRelation = async (token: string, patch: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.get(`v1/customer/book/${patch}/relations`, config);
        return res;
    } catch (response) {}
};

export const searchBooks = async (
    token: string,
    page: number,
    searchValue: string,
    categoryId: number,
    gradeId: number,
    sortPromotion: boolean,
) => {
    try {
        const config = {
            headers: {
                token: token,
            },
            params: {
                search: searchValue,
                page: page,
                gradeId: gradeId,
                categoryId: categoryId,
                sortPromotion: sortPromotion,
            },
        };
        const res = await service.get('v1/customer/book', config);
        return res;
    } catch (response) {}
};
