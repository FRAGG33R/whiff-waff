export interface NotificationProps {
    notifications: {
        avatar: string;
        name: string;
        message: string;
        time: string;
    }[];
    content: number;
}

export type MuteProps = {
    user : string
}