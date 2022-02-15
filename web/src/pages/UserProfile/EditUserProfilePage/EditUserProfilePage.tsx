import EditUserProfileCell from 'src/components/UserProfile/EditUserProfileCell'

type UserProfilePageProps = {
  id: string
}

const EditUserProfilePage = ({ id }: UserProfilePageProps) => {
  return <EditUserProfileCell id={id} />
}

export default EditUserProfilePage
