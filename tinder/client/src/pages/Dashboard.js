import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import ChatContainer from '../components/ChatContainer'

const Dashboard = () => {

  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const userId = cookies.UserId

  const getUser = async () => {

    try {

      const response = await axios.get('http://localhost:8000/user', { 
        params: { userId } 
      })
      setUser(response.data)
      // const success = response.status === 200
      // if (success) navigate('/dashboard')

    } catch (err) {
      console.log(err)
    }
  }

  // This will call the getUser method anytime the user changes
  useEffect (() => {
    getUser()
  }, [])

  console.log('user', user)

  const characters = [
    {
      name: 'Richard Hendricks',
      url: 'https://imgur.com/oPj4A8u.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: 'https://imgur.com/oPj4A8u.jpg'
    },
    {
      name: 'Monica Hall',
      url: 'https://imgur.com/oPj4A8u.jpg'
    },
    {
      name: 'Jared Dunn',
      url: 'https://imgur.com/oPj4A8u.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://imgur.com/oPj4A8u.jpg'
    }
  ]

  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className="dashboard">
      <ChatContainer/>
      <div className="swipe-container">
        {characters.map((character) =>
          <TinderCard 
            className='swipe' 
            key={character.name} 
            onSwipe={(dir) => swiped(dir, character.name)} 
            onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
        <div className='swipe-info'>
          {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard