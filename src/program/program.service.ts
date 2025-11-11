import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';
import { ConflictError } from 'src/common/errors/conflict.error';
import { NotFoundError } from 'src/common/errors/not-found.error';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepo: Repository<Program>,
  ) {}

  async create(data: CreateProgramDto) {
    const exists = await this.programRepo.findOne({
      where: { name: data.name },
    });
    if (exists)
      throw new ConflictError('Ya existe un programa con ese nombre.');

    const program = this.programRepo.create(data);
    return this.programRepo.save(program);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [data, total] = await this.programRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} program`;
  }

  async update(id: string, updateProgramDto: UpdateProgramDto) {
    const program = await this.programRepo.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!program) {
      throw new NotFoundError('Programa no encontrado 🤷‍♂️');
    }

    Object.assign(program, updateProgramDto);

    return await this.programRepo.save(program);
  }

  async delete(id: string) {
    const result = await this.programRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundError('Programa no encontrado');

    return { message: 'Programa eliminado correctamente' };
  }
}
