import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaign } from '../components'


const Profile = () => {
  const { contract, address, getUserCampaign } = useStateContext();
  const [campaign, setCampaign] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllCampaigns = async () => {
    const data = await getUserCampaign();
    setLoading(true);
    setCampaign(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchAllCampaigns();
  }, [contract, address])

  return (
    <DisplayCampaign
      title="My Campaigns"
      loading={loading}
      campaign={campaign}
    />
  )
}

export default Profile