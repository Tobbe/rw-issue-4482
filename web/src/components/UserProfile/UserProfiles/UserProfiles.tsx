import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/UserProfile/UserProfilesCell'

const DELETE_USER_PROFILE_MUTATION = gql`
  mutation DeleteUserProfileMutation($id: String!) {
    deleteUserProfile(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const UserProfilesList = ({ userProfiles }) => {
  const [deleteUserProfile] = useMutation(DELETE_USER_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('UserProfile deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete userProfile ' + id + '?')) {
      deleteUserProfile({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((userProfile) => (
            <tr key={userProfile.id}>
              <td>{truncate(userProfile.id)}</td>
              <td>{truncate(userProfile.name)}</td>
              <td>{truncate(userProfile.email)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userProfile({ id: userProfile.id })}
                    title={'Show userProfile ' + userProfile.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserProfile({ id: userProfile.id })}
                    title={'Edit userProfile ' + userProfile.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete userProfile ' + userProfile.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userProfile.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserProfilesList
