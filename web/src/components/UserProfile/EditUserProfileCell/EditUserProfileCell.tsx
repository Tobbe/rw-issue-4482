import type { EditUserProfileById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import UserProfileForm from 'src/components/UserProfile/UserProfileForm'

export const QUERY = gql`
  query EditUserProfileById($id: String!) {
    userProfile: userProfile(id: $id) {
      id
      name
      email
    }
  }
`
const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateUserProfileMutation($id: String!, $input: UpdateUserProfileInput!) {
    updateUserProfile(id: $id, input: $input) {
      id
      name
      email
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userProfile }: CellSuccessProps<EditUserProfileById>) => {
  const [updateUserProfile, { loading, error }] = useMutation(UPDATE_USER_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('UserProfile updated')
      navigate(routes.userProfiles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateUserProfile({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit UserProfile {userProfile.id}</h2>
      </header>
      <div className="rw-segment-main">
        <UserProfileForm userProfile={userProfile} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
