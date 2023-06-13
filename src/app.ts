import { fastify } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { env } from '@/env'
import cors from '@fastify/cors'
import { adminUserAuthenticateRoutes } from './routes/admin.users.routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(cors, {
  origin: true,
  credentials: true,
})

app.get('/ping', async (request, reply) => {
  return { hello: 'world' }
})

app.register(adminUserAuthenticateRoutes, { prefix: 'admin' })

// app.register(gymsRoutes, { prefix: 'api' })
// app.register(checkInsRoutes, { prefix: 'api' })

app.setErrorHandler((error, _request, reply) => {
  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_COOKIE') {
    return reply
      .status(401)
      .send({ message: 'Invalid JWT token.', code: error.code })
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Jogar para ferramente de log (DataDog, NewRelc, Sentry)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
