import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepositoryInterface } from '../users-repository-interface'

export class PrismaUsersRepository implements UsersRepositoryInterface {
  async create(data: Prisma.UserCreateManyInput) {
    const user = await prisma.user.create({ data })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }
}
