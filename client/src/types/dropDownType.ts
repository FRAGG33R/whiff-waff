export interface NotificationProps {
    notifications: {
        src: string;
        name: string;
        message: string;
        time: string;
    }[];
    content: number;
}