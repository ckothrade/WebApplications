import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const AuthModal = ({setShowModal, isSignup}) => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  let navigate = useNavigate()

  console.log(email, password, confirmPassword)

  const handleClick = () => {
    setShowModal(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(isSignup && (password !== confirmPassword)) {
        setError('Passwords do not match!')
        return
      }

      const resp = await axios.post(`http://localhost:8000/${isSignup ? 'signup' : 'login'}`, {email, password})

      setCookie('UserId', resp.data.userId)
      setCookie('AuthToken', resp.data.token)

      const success = resp.status === 201
      
      if (success && isSignup) navigate('/onboarding')
      if (success && !isSignup) navigate('/dashboard')
      // console.log('need to make a post request to the DB')
      window.location.reload() // reloads after authToken is read

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>X</div>
      <h2>{isSignup ? 'CREATE ACCOUNT' : 'LOGIN'}</h2>
      <p>By clicking signup you agree to our terms and conditions. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        { isSignup && 
          <input
            type="password"
            name="password-check"
            id="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        }
        <input className="submit-btn" type="submit"/>
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  )
}

export default AuthModal