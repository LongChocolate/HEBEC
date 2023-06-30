import { NotificationCustomer } from "./notificationCustomer"

export interface Notification {
    id: number 
    createdAt: number 
    updatedAt: number 
    title: string 
    body: string 
    isDeleted: boolean 
    isNoticed: boolean
    notificationCustomers: NotificationCustomer[]; 
    
    }
    