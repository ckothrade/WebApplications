import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Nav from '../components/Nav'


const Onboarding = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'male',
    gender_interest: 'female',
    email: cookies.Email,
    url: '',
    about: '',
    matches: []
  })

  let navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    console.log('submitted...')
    e.preventDefault()

    try {

      const response = await axios.put('http://localhost:8000/user', { formData })
      const success = response.status === 200
      if (success) navigate('/dashboard')

    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    console.log('e', e)

    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name
    console.log('value' + value, 'name' + name)

    setFormData((prevState) => ({
      ...prevState,
      [name] : value
    }))
  }

  console.log(formData)

  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
      />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label >Birthday</label>
            <div className="multi-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label >Gender</label>
            <div className="multi-input-container">
              <input
                id="male-gender"
                type="radio"
                name="gender_identity"
                value={"man"}
                onChange={handleChange}
                checked={formData.gender_identity === 'man'}
              />
              <label htmlFor="male-gender">Male</label>
              <input
                id="female-gender"
                type="radio"
                name="gender_identity"
                value={"woman"}
                onChange={handleChange}
                checked={formData.gender_identity === 'woman'}
              />
              <label htmlFor="female-gender">Female</label>
            </div>
            <label htmlFor="show-gender">SHOW GENDER</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />

            <label >Show Me</label>
            <div className="multi-input-container">
              <input
                id="male-gender-interest"
                type="radio"
                name="gender_interest"
                value={"men"}
                onChange={handleChange}
                checked={formData.gender_interest === 'men'}
              />
              <label htmlFor="male-gender-interest">Men</label>
              <input
                id="female-gender-interest"
                type="radio"
                name="gender_interest"
                value={"women"}
                onChange={handleChange}
                checked={formData.gender_interest === 'women'}
              />
              <label htmlFor="female-gender-interest">Women</label>
              <input
                id="every-gender-interest"
                type="radio"
                name="gender_interest"
                value={"everyone"}
                onChange={handleChange}
                checked={formData.gender_interest === 'everyone'}
              />
              <label htmlFor="every-gender-interest">Both</label>
            </div>

            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              placeholder="I enjoy..."
              required={true}
              value={formData.about}
              onChange={handleChange}
            />

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
                id="url"
                type="url"
                name="url"
                required={true}
                onChange={handleChange}
              />
            <div className="photo-container">
              {formData.url && <img src={formData.url} alt="profile pic preview"/>}
            </div>
          </section>
        </form>
      </div>
    </>
  )
}

export default Onboarding