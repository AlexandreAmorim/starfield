import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    document: z.string(),
    password: z.string().min(6),
  })

  const { document, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      document,
      password,
    })

    const token = await reply.jwtSign({
      sign: {
        sub: user.id,
      },
    })

    const refresh_token = await reply.jwtSign({
      sign: {
        sub: user.id,
        expiresIn: '7d',
      },
    })

    return reply.status(200).send({
      user,
      token,
      refresh_token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
