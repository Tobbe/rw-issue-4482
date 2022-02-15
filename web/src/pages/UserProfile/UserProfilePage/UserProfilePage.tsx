import UserProfileCell from 'src/components/UserProfile/UserProfileCell'

type UserProfilePageProps = {
  id: string
}

const UserProfilePage = ({ id }: UserProfilePageProps) => {
  return <UserProfileCell id={id} />
}

export default UserProfilePage
