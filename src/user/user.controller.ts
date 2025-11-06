import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
