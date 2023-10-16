import React, { useState } from 'react'
import { money } from '../assets'
import { CustomeButton, FormField } from '../components'
import { useStateContext } from '../context'
import { checkIfImage } from '../utils'
import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom'


const createCampaign = () => {

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const { connect, address, createCampaign } = useStateContext();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
      if (checkIfImage(form.image)) {
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
        navigate('/')
      } else {
        alert("set a valid image url to process further ")
        setForm({ ...form, image: '' })
      }
      console.log(form)
  }

  const inputFieldChange = (feildName, e) => {
    setForm({ ...form, [feildName]: e.target.value })
  }


  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={submitHandler} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          {/* formField */}
          <FormField
            labelName="Name*"
            placeholder="John Doe"
            value={form.name}
            HandleChange={(e) => inputFieldChange('name', e)}
            type="text"
          />
          {/* formField */}
          <FormField
            labelName="Campaign Title*"
            placeholder="Write a title"
            value={form.title}
            HandleChange={(e) => inputFieldChange('title', e)}
            type="text"
          />
        </div>
        {/* formField */}
        <FormField
          labelName="Story*"
          placeholder="Write a story"
          isTextArea
          value={form.description}
          HandleChange={(e) => inputFieldChange('description', e)}
          type="text"
        />


        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          {/* formField */}
          <FormField
            labelName="Goal*"
            placeholder="0.3ETH"
            value={form.target}
            HandleChange={(e) => inputFieldChange('target', e)}
            type="number"
          />
          {/* formField */}
          <FormField
            labelName="End Date*"
            placeholder="End Date"
            value={form.deadline}
            HandleChange={(e) => inputFieldChange('deadline', e)}
            type="date"
          />
        </div>

        {/* formField */}
        <FormField
          labelName="Campaign picture*"
          placeholder="paste image url"
          value={form.image}
          HandleChange={(e) => inputFieldChange('image', e)}
          type="url"
        />

        <div className="flex justify-center items-center mt-[40px]">
          {/* custom button */}
          <CustomeButton
            btnType="submit"
            styles='bg-[#4acd8d]'
            title="Register Camapign"
          />
        </div>
      </form>
    </div>
  )
}

export default createCampaign