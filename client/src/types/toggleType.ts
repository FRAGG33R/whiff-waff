export type  ToggleProps ={
    firstValue: string;
    secondValue: string;
    tab: string;
}
export type ToggleChatProps={
    firstValue: string;
    secondValue: string;
    onToggle: (value: string) => void;
}