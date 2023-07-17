export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>&{
    text: string;
    onClick: () => void;
    firstValue: string;
    secondValue: string;
    firstFunction: () => void;
    secondFunction: () => void;
}
