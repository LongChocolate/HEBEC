import { News } from "./news";
import { Notification } from "./notification";

export interface NotificationCustomer {
    id: number;
    createdAt: number;
    updatedAt: number;
    isSeen: boolean;
    type: string;
    content: string;
    title: string;
    news: News | undefined;
    notification: Notification | undefined;
}
