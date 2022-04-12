const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const uri = 'mongodb+srv://kothrade:mongoDB414@cluster0.jjlqz.mongodb.net/Cluster0?retryWrites=true&w=majority'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json('hello to my app')
})

app.post('/signup', async (req, res) => {
  const client = new MongoClient(uri)

  const { email, password } = req.body

  const generatedUserId = uuidv4()
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await client.connect()
    const database = client.db('tinder')
    const users = database.collection('users')

    const existingUser = await users.findOne({ email })

    if(existingUser) {
      return res.status(409).send('Account already on file, please login!')
    }

    const sanitizedEmail = email.toLowerCase()

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_pw: hashedPassword
    }

    const insertedUser = await users.insertOne(data)

    // generate unique token (24 hr exp)
    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    })

    res.status(201).json({ token, userId: generatedUserId, email: sanitizedEmail })
  } catch (err){
    console.log(err)
  }

})

app.post('/login', async (req, res) => {
  const client = new MongoClient(uri)
  const { email, password } = req.body

  try {
    await client.connect()
    const database = client.db('tinder')
    const users = database.collection('users')

    const user = await users.findOne({ email })

    const confirmedPW = await bcrypt.compare(password, user.hashed_pw)

    if (user && confirmedPW) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24
      })

      res.status(201).json({ token, userId: user.user_id, email})
    }
    res.status(400).send('Invalid Credentials!')

  } catch (err) {
    console.log(err)
  }

})

app.get('/users', async (req, res) => {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const database = client.db('tinder')
    const users = database.collection('users')

    const returnedUsers = await users.find().toArray()
    res.send(returnedUsers)

  } finally {
    await client.close()
  }

})

app.listen(PORT, () => console.log('server running on PORT ' + PORT))