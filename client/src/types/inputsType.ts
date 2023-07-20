export interface searchInputProps {
    placeholder: string;
    onSearch: (value: string) => void;
}

export interface InputProps {
    label: string;
    isError: boolean;
    placeholder: string;
    isDisabled: boolean;
    type: string;
    lableColor: string;
    width: string;
	value: string;
	setValue	: (value: string) => void;
}