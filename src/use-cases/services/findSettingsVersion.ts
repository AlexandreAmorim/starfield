import { Setting } from '@prisma/client'
import { prisma } from 'prisma/client'

const findSettingsVersion = async (): Promise<Setting | null> => {
  const setting = await prisma.setting.findFirst()
  return setting
}

export { findSettingsVersion }
