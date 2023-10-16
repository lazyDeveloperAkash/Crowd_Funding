import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaign } from '../components'


const Home = () => {
  const { contract, address, getAllCampaigns } = useStateContext();
  const [campaign, setCampaign] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllCampaigns = async () => {
    const data = await getAllCampaigns();
    setLoading(true);
    setCampaign(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchAllCampaigns();
  }, [contract, address])

  return (
    <DisplayCampaign
      title="All the Campaigns"
      loading={loading}
      campaign={campaign}
    />
  )
}

export default Home