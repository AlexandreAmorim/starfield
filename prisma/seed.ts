import { v4 } from 'uuid'
import { hash } from 'bcryptjs'

import { prisma } from './client'

async function main() {
  const permission = await prisma.permission.create({
    data: {
      slug: 'user.create',
      name: 'Criar Usuários',
    },
  })

  const role = await prisma.role.create({
    data: {
      slug: 'administrator',
      name: 'Administrador',
    },
  })

  await prisma.permissionRole.create({
    data: {
      role_id: role.id,
      permission_id: permission.id,
    },
  })

  const user = await prisma.user.create({
    data: {
      id: v4(),
      first_name: 'MILTON',
      last_name: 'ALEXANDRE DE AMORIM',
      email: 'milton.rj30@gmail.com',
      document: '04160807747',
      password: await hash('04160807747', 8),
      document_secondary: '42746850',
      gender: 'MASCULINO',
      phone: '(21) 98391-8030',
      status: true,
    },
  })

  await prisma.roleUser.create({
    data: {
      user_id: user.id,
      role_id: role.id,
    },
  })
}

main()
