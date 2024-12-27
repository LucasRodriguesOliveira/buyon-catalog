import { UserModel } from 'src/domain/model/user.model';
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserModel;
  }
}
