import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_USER_PROFILE_MUTATION = gql`
  mutation DeleteUserProfileMutation($id: String!) {
    deleteUserProfile(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const UserProfile = ({ userProfile }) => {
  const [deleteUserProfile] = useMutation(DELETE_USER_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('UserProfile deleted')
      navigate(routes.userProfiles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete userProfile ' + id + '?')) {
      deleteUserProfile({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">UserProfile {userProfile.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{userProfile.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{userProfile.name}</td>
            </tr><tr>
              <th>Email</th>
              <td>{userProfile.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUserProfile({ id: userProfile.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(userProfile.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default UserProfile
