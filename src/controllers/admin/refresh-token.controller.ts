import { FastifyReply, FastifyRequest } from 'fastify'

export async function adminUserRefreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({ onlyCookie: true })

  const { uprofile } = request.user

  const token = await reply.jwtSign(
    { uprofile },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refresToken = await reply.jwtSign(
    { uprofile },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '1d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refresToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
