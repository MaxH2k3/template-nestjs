import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../../shared/models/common/error-response.model';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();
      message = responseMessage['message'] || responseMessage;
    }

    response
      .status(status)
      .json(new ErrorResponse(status, message, request.url));
  }
}
