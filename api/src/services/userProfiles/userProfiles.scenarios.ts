import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserProfileCreateArgs>({
  userProfile: {
    one: { data: { id: 'String', name: 'String', email: 'String' } },
    two: { data: { id: 'String', name: 'String', email: 'String' } },
  },
})

export type StandardScenario = typeof standard
