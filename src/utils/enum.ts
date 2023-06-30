import {Navigation} from './Navigation';

export enum NavigationScreens {
    Tabbar = 'TabbarScreen',
    Auth = 'AuthScreen',
    Home = 'HomeScreen',
    Login = 'LoginScreen',
    Profile = 'ProfileScreen',
    ForgotPassword = 'ForgotPasswordScreen',
    TicketOrderBook = 'TicketOrderBookScreen',
    CartOrderBook = 'CartOrderBookScreen',
    AccountSetting = 'AccountSettingScreen',
    ChangePass = 'ChangePassScreen',
    Search = 'SearchScreen',
    DetailProduct = 'DetailProductScreen',
    CartShop = 'CartShopScreen',
    PaymentProcess = 'PaymentProcessScreen',
    PaymentProcessFirst = 'PaymentProcessFirst',
    PaymentProcessStep2 = 'PaymentProcessStep2',
    PaymentProcessFinal = 'PaymentProcessFinal',
    OrderBookSuccess = 'OrderBookSuccessScreen',
    History = 'HistoryScreen',
    DetailHistoryOrderBook = 'DetailHistoryOrderBookScreen',
    DetailHistoryShop = 'DetailHistoryShopScreen',
    ContactBookDashboard = 'ContactBookDashboardScreen',
    ContactBook = 'ContactBookScreen',
    User = 'UserScreen',
    WriteAdviceMedicine = 'WriteAdviceMedicineScreen',
    AbsenceForm = 'AbsenceFormScreen',
    DoHomework = 'DoHomeworkScreen',
    Chat = 'ChatScreen',
    Content = 'ContentScreen',
    ContentNews = 'ContentNewsScreen',
    News = 'NewsScreen',
    Promotion = 'PromotionScreen',
    ContentPromotion = 'ContentPromotionScreen',
    DetailNewsFeed = 'DetailNewsFeedScreen',
    StrategyOrderBook = 'StrategyOrderBookScreen',
    Notification = 'NotificationScreen',
    DetailNotification = 'DetailNotificationScreen',
    HebecShop = 'HebecShopScreen',
    Register = 'RegisterScreen',
    RegisterSuccess = 'RegisterSuccessScreen',
    RegisterPartner = 'RegisterPartnerScreen',
    RegisterPartnerList = 'RegisterPartnerListScreen',
    HighlightProduct = 'HighlightProductScreen',
    Wallet = 'WalletScreen',
    WithdrawRequestHistory = 'WithdrawRequestHistoryScreen',
    WithdrawRequest = 'WithdrawRequestScreen',
    PersonalInformation = 'PersonalInformationScreen',
}

export enum StorageType {
    HistoryOrder = 'HISTORY_ORDER',
    InfoOrder = 'INFO_ORDER',
    InfoAddress = 'INFO_ADDRESS',
}

export enum OrderStatus {
    Pending = 'PENDING',
    Complete = 'COMPLETE',
    Cancel = 'CANCEL',
    Package = 'PACKAGE',
    Delivering = 'DELIVERING',
}

export enum PaymentType {
    Cash = 'CASH',
    ViettelPay = 'VIETTELPAY',
}

export enum NotificationCustomerType {
    Activity = 'ACTIVITY',
    AdviceNormal = 'ADVICE_NORMAL',
    CommentDate = 'COMMENT_DATE',
    Homework = 'HOMEWORK',
    Newsfeed = 'NEWSFEED',
    Album = 'ALBUM',
    Score = 'SCORE',
    Timetable = 'TIMETABLE',
    PreOrder = 'PRE_ORDER',
    CancelPreOrder = 'CANCEL_PRE_ORDER',
    Order = 'ORDER',
    News = 'NEWS',
    Promotion = 'PROMOTION',
    Notification = 'NOTIFICATION',
    Comment = 'COMMENT',
    Payment = 'PAYMENT',
}

export enum BookType {
    Single = 'SINGLE',
    Combo = 'COMBO',
}
