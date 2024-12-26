import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { IFormatExceptionMessage } from 'src/domain/exception/http-exception.interface';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let result: IFormatExceptionMessage;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      result = exception.getResponse() as IFormatExceptionMessage;
    } else {
      result = {
        message: exception.message,
        errCode: null,
      };
    }

    const responseData = {
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...result,
    };

    this.logMessage(request, result, status, exception);

    response.status(status).send(responseData);
  }

  private logMessage(
    request: Request,
    message: IFormatExceptionMessage,
    status: number,
    exception: HttpException | Error,
  ) {
    if (HttpStatus.INTERNAL_SERVER_ERROR === status) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} errCode=${message.errCode ?? null} message=${message.message ?? null}`,
        exception.stack,
      );
      return;
    }

    this.logger.warn(
      `End Request for ${request.path}`,
      `method=${request.method} status=${status} errCode=${message.errCode ?? null} message=${message.message ?? null}`,
    );
  }
}
