import { TokenConfig } from '../types/token.interface';

export const JWT_CONFIGTOKEN = Symbol('__token__');

export const tokenConfig = (): { token: TokenConfig } => {
  return {
    token: {
      secret: process.env.SECRET_TOKEN,
    },
  };
};
