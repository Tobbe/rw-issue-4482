export const schema = gql`
  type UserProfile {
    id: String!
    name: String!
    email: String!
  }

  type Query {
    userProfiles: [UserProfile!]! @requireAuth
    userProfile(id: String!): UserProfile @requireAuth
  }

  input CreateUserProfileInput {
    name: String!
    email: String!
  }

  input UpdateUserProfileInput {
    name: String
    email: String
  }

  type Mutation {
    createUserProfile(input: CreateUserProfileInput!): UserProfile! @requireAuth
    updateUserProfile(
      id: String!
      input: UpdateUserProfileInput!
    ): UserProfile! @requireAuth
    deleteUserProfile(id: String!): UserProfile! @requireAuth
  }
`
