import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserProfile(profileToVerify: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { uprofile } = request.user

    console.log(uprofile)
    console.log(profileToVerify)

    if (!uprofile.includes(profileToVerify)) {
      return reply.status(401).send({ message: 'Unauthorized profile.' })
    }
  }
}
