export interface IAuth {
    phone: string | undefined;
    name: string | undefined;
    address: string | undefined;
    email: string | undefined;
    gender: string | undefined;
    image: string | undefined;

    token?: string | undefined;
    login?: boolean;
}

export type AuthContextType = {
    auth: IAuth;
    // saveAuth: (auth: IAuth) => void;
    updateAuth: (auth: IAuth) => void;
    loginAuth: (token: string) => void;
    resetAuth: () => void;
};
