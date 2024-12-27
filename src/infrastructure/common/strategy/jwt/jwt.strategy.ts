import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/domain/auth/jwt/jwt-payload.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { JWT_CONFIGTOKEN } from 'src/infrastructure/config/env/token.config';
import { TokenConfig } from 'src/infrastructure/config/types/token.interface';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { LoginProxy } from 'src/infrastructure/usecase-proxy/proxies/auth/login-usecase.proxy';
import { LoginUseCase } from 'src/usecases/auth/login.usecase';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(LoginProxy.Token)
    private readonly loginUseCase: LoginUseCase,
    private readonly configService: ConfigService,
    private readonly logger: ILogger,
    private readonly httpExceptionService: HttpExceptionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<TokenConfig>(JWT_CONFIGTOKEN.description)
        .secret,
    });
  }

  public async validate(payload: JwtPayload) {
    const user = await this.loginUseCase.validateUserJwt(payload.email);

    if (!user) {
      this.logger.warn(JwtStrategy.name, 'User not found');
      this.httpExceptionService.unauthorized({
        message: 'User not found',
      });
    }

    return user;
  }
}
