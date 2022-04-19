export const SERVICE_PORT = process.env.SERVICE_PORT || 80
export const NODE_ENV = process.env.NODE_ENV

export const GRAPHQL_INTROSPECTION = Boolean(process.env.GRAPHQL_INTROSPECTION)
export const GRAPHQL_DEBUG = Boolean(process.env.GRAPHQL_DEBUG)

export enum CONSTANT {
  SERVICE_NAME = "SimpleWallet",
  SERVICE_URL_SUFFIX = "/api/graphql"
}

export enum NETWORK {
  BITCOIN_P2WPKH = "bitcoin_p2wpkh"
  // BITCOIN_P2WSH = "bitcoin_p2wsh"
}
