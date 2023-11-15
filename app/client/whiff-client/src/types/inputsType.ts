import React from "react";

export interface searchInputProps {
    placeholder: string;
    onSearch: () => void;

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
	setValue  : (value: string) => void;
	setError  : (value: boolean) => void;
	handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	regExp    : RegExp;
}
