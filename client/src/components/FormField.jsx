import React from 'react'

const FormField = ({labelName,placeholder, isTextArea,type,value,HandleChange}) => {
  return (
    <label className='flex flex-col'>
        {labelName && <span className='text-[#979CA6] font-epilogue font-normal'>{labelName}</span>}
        {isTextArea ? (
            <textarea
            type={type}
            required
            row={10}
            onChange={HandleChange}
            placeholder={placeholder}
            className='px-4 py-3 rounded-[5px] text-white bg-transparent outline-none border-[1px] border-[#979CA6]'
            />
        ):(
            <input 
            type={type}
            required
            step='0.1'
            onChange={HandleChange}
            placeholder={placeholder}
            className={`px-4 py-3 rounded-[5px] text-white bg-transparent outline-none border-[1px] border-[#979CA6] ${type === "date" ? 'placeholder:bg-white' : 'none'}`}
             />
        )}
    </label>
  )
}

export default FormField