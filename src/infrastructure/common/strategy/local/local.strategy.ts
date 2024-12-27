import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from 'src/domain/model/user.model';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { LoginProxy } from 'src/infrastructure/usecase-proxy/proxies/auth/login-usecase.proxy';
import { LoginUseCase } from 'src/usecases/auth/login.usecase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(LoginProxy.Token)
    private readonly loginUseCase: LoginUseCase,
    private readonly httpExceptionService: HttpExceptionService,
    private readonly logger: ILogger,
  ) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(email: string, password: string): Promise<UserModel> {
    if (!email || !password) {
      this.logger.warn(LocalStrategy.name, `Username or password missing`);
      this.httpExceptionService.unauthorized({
        message: 'Invalid Credentials',
      });
    }

    const user = await this.loginUseCase.validateUserLocal(email, password);

    if (!user) {
      this.logger.warn(LocalStrategy.name, 'Invalid username or password');
      this.httpExceptionService.unauthorized({
        message: 'Invalid Credentials',
        errCode: HttpStatus.UNAUTHORIZED,
      });
    }

    return user;
  }
}
