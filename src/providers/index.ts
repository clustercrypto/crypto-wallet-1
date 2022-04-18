import { NextFunction, Request, Response } from "express"

import { NetworkProvider } from "./network.provider"

export const registerProvidersMiddleware = () => async (_req: Request, _res: Response, next: NextFunction) => {
  await registerProviders()
  next()
}

export const registerProviders = async () => {
  await NetworkProvider.provide()
}
