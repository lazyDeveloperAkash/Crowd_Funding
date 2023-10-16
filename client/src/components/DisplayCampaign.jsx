import React from 'react'
import { loader } from '../assets'
import { Card } from './index'
import { useNavigate } from 'react-router-dom'

const DisplayCampaign = ({ title, loading, campaign }) => {
    const navigate = useNavigate();
    const handleNavigate = (campaign)=> {
        navigate(`/campaign-details/:${campaign.title}` , {state:campaign})
    }
    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-black text-left">{title} - ({campaign.length})</h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {loading && <img src={loader} alt="loader" className='h-[100px] w-[100px] object-contain' />}


                {!loading && campaign.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        You have not created any campigns yet
                    </p>
                )}

                {/* card design */}
                {!loading && campaign.length > 0 &&
                    campaign.map((campaign) => (
                        <Card
                            key={campaign.id}
                            {...campaign}
                            handleClick={() => handleNavigate(campaign)}
                        />

                    ))
                }
            </div>
        </div>
    )
}

export default DisplayCampaign