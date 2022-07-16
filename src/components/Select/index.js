import React,{useEffect, useState} from 'react'
import Select from 'react-select';
import './select.scss'

const Dropdown = ({data,onChange,placeholder,clear,setClear}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    let options=[]
    useEffect(()=>{
      setSelectedOption('');
      setClear(false)
    },[clear])
    data&&data.map((item,index)=>{
      let obj={};
      obj={
        id:item.id,
        value:item.title,
        label:item.title
      }
      options.push(obj);
    })
    const customStyles = {
      indicatorSeparator: (styles) => ({ display: 'none' }),
      indicatorContainer: (styles) => ({ color: 'red', backgroundColor: 'red'}),
      option: (provided, state) => ({
        ...provided,
        '&:hover': {
          // backgroundColor: '#232323',
          color: '#ffffff',
        },
  
        color: state.isSelected ? 'white' : 'white',
        // backgroundColor: state.isSelected ? '#232323' : '#232323',
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        transition: 'all .2s ease',
        transform: state.isFocused ? 'rotate(180deg)' : 'rotate(270deg)'
      }),
      valueContainer: (base, state) => ({
        ...base,
        color: '#ffffff',
      }),
      control: (base, state) => ({
        ...base,
        color: state.isSelected ? 'red' : 'blue',
        backgroundColor: state.isSelected ? '#fff' : '#fff',
        width: '100%',
        borderColor: 'transparent',
      }),
      singleValue: (base, state) => ({
        ...base,
        color: state.isSelected ? '#000' : '#000',
        fontSize: '17px',
      }),
      menuList: (base, state) => ({
        ...base,
        paddingTop: '0',
        paddingBottom: '0',
        zIndex: '3',
        backgroundColor:"#232323"
      }),
    };
    return (
        
        <Select
          placeholder={placeholder}
          value={selectedOption}
          onChange={(e)=>{
            setSelectedOption(e)
            onChange(e.value) 
          }}
          options={options}
          className='select'
          styles={customStyles}
        />
      )
}

export default Dropdown