import { useAuth } from '@redwoodjs/auth'
import { useLazyQuery } from '@apollo/client'
import { useCallback } from 'react'
import BlogPostsCell from 'src/components/BlogPostsCell'

const GET_USER = gql`
  query getUserProfile($id: String!) {
    userProfile: userProfile(id: $id) {
      id
      name
      email
    }
  }
`

const HomePage = () => {
  const { logIn, logOut } = useAuth()
  const [getUserProfile] = useLazyQuery(GET_USER)

  const login = useCallback(() => {
    const email = 'ns-coach@example.com'
    const password = 'password'

    logIn({ email, password }).then(({ error, user }) => {
      console.log('error', error)
      console.log('user', user)
      getUserProfile({ variables: { id: user.id } }).then((data) => {
        console.log('data', data)
      })
    })
  }, [logIn, getUserProfile])

  const logout = useCallback(() => {
    logOut().then((data) => {
      console.log('logout data', data)
    })
  }, [logOut])

  return (
    <>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>

      <BlogPostsCell />
    </>
  )
}

export default HomePage
