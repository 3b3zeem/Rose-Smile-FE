import React from 'react'
import DentalClinicSlider from '../../components/Home Components/Slider/Slider'
import Offers from '../../components/Home Components/Offers/Offers'
import Services from '../../components/Home Components/Services/Services'

const Home = () => {
  return (
    <React.Fragment>
      <DentalClinicSlider />
      <Offers />
      <Services />
    </React.Fragment>
  )
}

export default Home
