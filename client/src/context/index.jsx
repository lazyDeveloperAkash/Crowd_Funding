import React, { createContext, useContext } from "react";
import { useContract, useContractWrite,useContractRead, useMetamask, useAddress } from '@thirdweb-dev/react'
import { ethers } from "ethers";
import moment from 'moment'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

  const { contract } = useContract("0x60e26Ea2B65379d797C5655565a3B317aDd3453E");
  const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign")

  const connect = useMetamask();
  const address = useAddress();

  let add;
  if (address) add = address;

  const publishCampaign = async (form) => {
    console.log("in publish campaign")
    try {
      const data = await createCampaign({
        args: [
          add,
          form.title,
          form.description,
          form.target,
          Math.floor(new Date(form.deadline).getTime()/1000),
          form.image,
        ]
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.log(err)
    }
  }
  
  const getAllCampaigns = async()=>{
    const campaigns = await contract.call('getCampaign');

    const parseCapmaigns = campaigns.map((campaign, i)=>({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      deadline: campaign.deadline._hex,
      target: ethers.utils.formatEther(campaign.target.toString()),
      image: campaign.image,
      ammountCollected: ethers.utils.formatEther(campaign.ammountCollected.toString()),
      id: i
    }))
    return parseCapmaigns;
  }

  const getUserCampaign = async()=>{
    const data = await getAllCampaigns();
    const filteredCampaigns = data.filter((t)=> t.owner === address)
    console.log(filteredCampaigns)

    return filteredCampaigns;
  }

  const donate = async(id, amount)=>{
    const data = await contract.call("donateCampaign", [id],{value: ethers.utils.parseEther(amount)});
    return data;
  }

  const getDonations = async(id)=>{
    let data = await contract.call("getDonators" , [id])
      const numberOfCampaign = data[0].length

      let parseDonation = []

      for(var i=0;i<numberOfCampaign;i++){
       parseDonation.push({
        donator : data[0][i],
        donation: ethers.utils.formatEther(data[1][i].toString())
       })
      }
      return parseDonation;
  }

  return (
    <StateContext.Provider
      value={{
        connect,
        address,
        contract,
        getAllCampaigns,
        createCampaign: publishCampaign,
        getUserCampaign,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);