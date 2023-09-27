import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  document: string
  first_name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    document,
    first_name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail =
      await this.usersRepository.findByDocument(document)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      document,
      first_name,
      email,
      password: password_hash,
    })

    return {
      user,
    }
  }
}
