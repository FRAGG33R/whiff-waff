
export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>&{
    firstValue: string;
    secondValue: string;
    firstFunction: () => void;
    secondFunction: () => void;
}

export type PrimaryButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>&{
    text: string;
    onClick: () => void;
}
