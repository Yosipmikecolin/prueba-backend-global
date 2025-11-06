import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from 'src/program/entities/program.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program, User])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
