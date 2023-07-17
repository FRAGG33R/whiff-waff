
export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>&{
    text: string;
    onClick: () => void;
    firstValue: string;
    secondValue: string;
    firstFunction: () => void;
    secondFunction: () => void;
}

export type PrimaryButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>&{
    text: string;
    onClick: () => void;
}
export type SecondaryButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>&{
    text: string;
    onClick: () => void;
}

export type intraButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>&{
    text: string;
    onClick: () => void;
}

export type authButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>&{
    text: string;
    onClick: () => void;
}
