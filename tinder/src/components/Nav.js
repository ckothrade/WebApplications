import logo from '../images/Tinder_logo_250.png'
import whiteLogo from '../images/tinder_logo_white_250.png'

const Nav = ({minimal, authToken, setShowModal, showModal, setIsSignup}) => {

  const handleClick = () => {
    setShowModal(true)
    setIsSignup(false)
  }

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? logo : whiteLogo} alt=""/>
      </div>

      {!authToken && !minimal && 
        <button className='nav-button'
        onClick={handleClick}
        disabled={showModal}
        >Log In</button>
      }
    </nav> 
 )
}

export default Nav