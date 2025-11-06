import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '../errors/app.error';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 1) Manejo de tus errores personalizados
    if (exception instanceof AppError) {
      return response.status(exception.statusCode).json({
        success: false,
        message: exception.message,
      });
    }

    // 2) Manejo de errores de validación del DTO
    if (exception instanceof BadRequestException) {
      const res: any = exception.getResponse();
      return response.status(400).json({
        success: false,
        message: 'Validación fallida',
        errors: res.message, // <- array con los mensajes del DTO
      });
    }

    // 3) Manejo de errores HTTP estándar
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;
      return response.status(status).json({
        success: false,
        message,
      });
    }

    // 4) Cualquier otro error inesperado
    console.error('Unexpected Error:', exception);

    return response.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
}
