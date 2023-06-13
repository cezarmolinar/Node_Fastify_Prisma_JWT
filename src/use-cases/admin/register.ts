import { UsersRepositoryInterface } from '@/repositories/users-repository-interface'
import bcryptjs from 'bcryptjs'
import { User } from '@prisma/client'
import { env } from '@/env'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  profile: string
  cpf: string
}

interface RegisterUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    name,
    email,
    password,
    profile,
    cpf,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await bcryptjs.hash(password, env.HASH_STEPS)

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      profile,
      CPF: cpf,
    })

    return { user }
  }
}
