import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const repository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(repository)

  return authenticateUseCase
}
