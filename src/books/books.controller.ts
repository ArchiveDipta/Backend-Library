import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
export class BooksController {

  @Get()
  @ApiOperation({ summary: 'Menampilkan seluruh data buku' })
  findAll() {
    // nanti bisa diganti ambil dari service / database
    return [];
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Menambahkan buku (ADMIN only)' })
  create(@Body() body: any) {
    // nanti bisa validasi + simpan ke database
    return body;
  }
}
