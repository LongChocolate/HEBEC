import React from 'react';
import {CallSvg} from '@/assets/svg/CallSvg';
import {ChatSvg} from '@/assets/svg/ChatSvg';
import {DescriptionSvg} from '@/assets/svg/DescriptionSvg';
import {FacebookSvg} from '@/assets/svg/FacebookSvg';
import {FAQSvg} from '@/assets/svg/FAQSvg';
import {InformationSvg} from '@/assets/svg/InformationSvg';
import {LoginSvg} from '@/assets/svg/LoginSvg';
import {PolicySvg} from '@/assets/svg/PolicySvg';
import {YoutubeSvg} from '@/assets/svg/YoutubeSvg';
import {LogoutSvg} from '@/assets/svg/LogoutSvg';
import {SoLienLacSvg} from '@/assets/svg/SoLienLacSvg';
import {PasswordSvg} from '@/assets/svg/PasswordSvg';
import {UserProfileSvg} from '@/assets/svg/UserProfileSvg';
import {FollowBillSvg} from '@/assets/svg/FollowBillSvg';

const SETTING_SUPPORT = [
    {
        titleGroup: 'hỗ trợ',
        unit: [
            {
                icon: <InformationSvg />,
                title: 'Giới thiệu HEBEC',
                access: true,
                split: true,
            },
            {
                icon: <DescriptionSvg />,
                title: 'Hướng dẫn sử dụng',
                access: true,
                split: true,
            },
            {
                icon: <PolicySvg />,
                title: 'Điều khoản sử dụng',
                access: true,
                split: true,
            },
            {
                icon: <FAQSvg />,
                title: 'Các vấn đề thường gặp',
                access: true,
                split: true,
            },
        ],
    },
];

const SETTING_CONTACT = [
    {
        titleGroup: 'liên hệ',
        unit: [
            {
                icon: <ChatSvg />,
                title: 'Chat với admin',
                chat: true,
                split: true,
            },
            {
                icon: <CallSvg />,

                title: 'Hotline 18008080',
                split: true,
            },
            {
                icon: <FacebookSvg />,
                title: 'Facebook HEBEC',
                split: true,
            },
            {
                icon: <YoutubeSvg />,
                title: 'Youtube HEBEC',
                split: true,
            },
        ],
    },
];

export const SETTING_ACCOUNT_NOLOGIN = [
    {
        titleGroup: 'tài khoản',
        unit: [
            {
                icon: <LoginSvg />,
                title: 'Đăng nhập vào HEBEC',
                access: true,
                function: 'login',
                split: true,
                primary: true,
            },
        ],
    },
    ...SETTING_SUPPORT,
    ...SETTING_CONTACT,
];

export const SETTING_ACCOUNT_HAVELOGIN = [
    {
        titleGroup: 'tài khoản',
        unit: [
            {
                icon: <FollowBillSvg />,
                title: 'Theo dõi đơn hàng',
                access: true,
                split: true,
                function: 'historyShop',
            },
            {
                icon: <UserProfileSvg />,
                title: 'Thông tin cá nhân',
                access: true,
                split: true,
                function: 'profile',
            },
            {
                icon: <PasswordSvg />,
                title: 'Đổi mật khẩu',
                access: true,
                split: true,
                function: 'changePassword',
            },
            {
                icon: <SoLienLacSvg selected />,
                title: 'Sổ liên lạc',
                access: true,
                split: true,
            },
            {
                icon: <LogoutSvg />,
                title: 'Đăng xuất',
                access: true,
                function: 'logout',
                split: true,
            },
        ],
    },
    ...SETTING_SUPPORT,
    ...SETTING_CONTACT,
];
