import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Request } from 'express';
import { UserModel } from 'src/domain/model/user.model';

export const GetUser = createParamDecorator(
  (_, req: ExecutionContextHost): UserModel => {
    const request: Request = req.switchToHttp().getRequest();
    return request.user;
  },
);
