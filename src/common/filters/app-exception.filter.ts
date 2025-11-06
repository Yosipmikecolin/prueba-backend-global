import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '../errors/app.error';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof AppError) {
      return response.status(exception.statusCode).json({
        success: false,
        message: exception.message,
      });
    }

    console.error('Unexpected Error:', exception);

    return response.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
}
