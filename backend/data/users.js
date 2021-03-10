import bcrypt from 'bcryptjs'

const users = [
    {
      name: 'Admin User',
      email: 'adminclickpick@grr.la',
      password: bcrypt.hashSync('qwerty', 10),
      isAdmin: true,
    },
    {
      name: 'Praveen R',
      email: 'praveen@grr.la',
      password: bcrypt.hashSync('qwerty', 10)
    },
    {
      name: 'Naveen R',
      email: 'naveen@grr.la',
      password: bcrypt.hashSync('qwerty', 10)
    },
  ]

  export default users