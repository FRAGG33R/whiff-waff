export interface InputProps {
    label: string;
    isError: boolean;
    placeholder: string;
    isDisabled: boolean;
    type: string;
    lableColor: string;
    width: string;
    onSearch: (value: string) => void;
  }