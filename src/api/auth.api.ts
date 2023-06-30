import * as service from '@/utils/request';

export const loginApi = async (username: string, password: string) => {
    try {
        const res = await service.post('v1/customer/auth/login', {
            username: username,
            password: password,
        });

        return res;
    } catch (response) {}
};

export const registerApi = async (account: any, googleId: string = null) => {
    const customer = {
        address: '647 Lý thường kiệt',
        email: 'xklbmd@gmail.com',
        gender: 'Nam',
        phone: account.username,
        ...account,
    };
    try {
        const res = await service.post(
            'v1/customer/auth/signup',
            googleId
                ? {
                      customer: customer,
                      googleId: googleId,
                  }
                : {customer: customer},
        );
        return res;
    } catch (error) {}
};

export const googleLogin = async (id: string) => {
    try {
        const res = await service.post('v1/customer/auth/social', {
            googleId: id,
        });

        return res;
    } catch (response) {}
};

export const getInfoApi = async (token: string, fcmToken: string) => {
    try {
        const config = {
            headers: {
                token: token,
                fcmToken: fcmToken,
            },
        };
        const res = await service.get('v1/customer/auth/profile', config);
        return res;
    } catch (error) {}
};

export const updatePassword = async (token: string, oldPassword: string, newPassword: string) => {
    try {
        const config = {
            headers: {
                token: token,
            },
        };
        const res = await service.post(
            'v1/customer/auth/password/update',
            {
                oldPassword: oldPassword,
                newPassword: newPassword,
            },
            config,
        );

        return res;
    } catch (response) {}
};
