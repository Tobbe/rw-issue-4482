import type { FindUserProfileById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserProfile from 'src/components/UserProfile/UserProfile'

export const QUERY = gql`
  query FindUserProfileById($id: String!) {
    userProfile: userProfile(id: $id) {
      id
      name
      email
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserProfile not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  userProfile,
}: CellSuccessProps<FindUserProfileById>) => {
  return <UserProfile userProfile={userProfile} />
}
