import React from 'react'
import Image from 'next/image';
import VectorIcon from '../../../../public/searchIcon.svg'
import { searchInputProps } from '../../../types/inputsType';

const SearchInput: React.FC < searchInputProps> = ({onSearch}) => {
  
    return (
      <div className='relative w-full h-full text-gray-600 bg-transparent'>
        <input 
            type={'search'}
            name={'search'}
            placeholder={'Search for everything...'}
            onChange={e => onSearch(e.target.value)}
            className='bg-transparent w-full placeholder:text-[#6C7FA7] placeholder:font-poppins h-full pl-16 text-xl focus:outline-none'
        />
        <button type='submit' className='w-8 h-full absolute left-5'>
            <Image src={VectorIcon } alt='vector icon'/>
        </button>
      </div>
    );
}

export default SearchInput