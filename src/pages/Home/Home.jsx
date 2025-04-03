import React from 'react'
import DentalClinicSlider from '../../components/Home Components/Slider/Slider'
import Offers from '../../components/Home Components/Offers/Offers'
import Services from '../../components/Home Components/Services/Services'
import DoctorsTeam from '../../components/Home Components/Doctors/Doctors'
import News from '../../components/Home Components/News/News'
import Locations from '../../components/Home Components/Locations/Locations'

const Home = () => {
  return (
    <React.Fragment>
      <DentalClinicSlider />
      <Offers />
      <Services />
      <DoctorsTeam />
      <News />
      <Locations />
    </React.Fragment>
  )
}

export default Home
