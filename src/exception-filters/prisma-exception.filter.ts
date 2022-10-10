import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  NotFoundError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { Response, Request } from 'express';

export type ErrorCodesToStatusMapping = {
  [key: string]: number;
};

@Catch(NotFoundError, PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  private errorCodesToStatusMapping: ErrorCodesToStatusMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2003: HttpStatus.BAD_REQUEST,
    P2025: HttpStatus.NOT_FOUND,
  };

  private exceptionShortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));
    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }

  catch(
    exception: NotFoundError | PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message: string;

    if (exception instanceof NotFoundError) {
      message = exception.message;
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: message,
        path: request.url,
      });
      return;
    }

    if (!Object.keys(this.errorCodesToStatusMapping).includes(exception.code)) {
      return super.catch(exception, host);
    }

    message = this.exceptionShortMessage(exception.message);
    const exceptionCode = this.errorCodesToStatusMapping[exception.code];
    response.status(exceptionCode).json({
      statusCode: exceptionCode,
      message: message,
      path: request.url,
    });
  }
}
