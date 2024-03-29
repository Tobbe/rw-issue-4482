import {
  userProfiles,
  userProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from './userProfiles'
import type { StandardScenario } from './userProfiles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userProfiles', () => {
  scenario('returns all userProfiles', async (scenario: StandardScenario) => {
    const result = await userProfiles()

    expect(result.length).toEqual(Object.keys(scenario.userProfile).length)
  })

  scenario(
    'returns a single userProfile',
    async (scenario: StandardScenario) => {
      const result = await userProfile({ id: scenario.userProfile.one.id })

      expect(result).toEqual(scenario.userProfile.one)
    }
  )

  scenario('creates a userProfile', async () => {
    const result = await createUserProfile({
      input: { id: 'String', name: 'String', email: 'String' },
    })

    expect(result.id).toEqual('String')
    expect(result.name).toEqual('String')
    expect(result.email).toEqual('String')
  })

  scenario('updates a userProfile', async (scenario: StandardScenario) => {
    const original = await userProfile({ id: scenario.userProfile.one.id })
    const result = await updateUserProfile({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a userProfile', async (scenario: StandardScenario) => {
    const original = await deleteUserProfile({
      id: scenario.userProfile.one.id,
    })
    const result = await userProfile({ id: original.id })

    expect(result).toEqual(null)
  })
})
