import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  // Peminjaman buku
  async borrow(dto: CreateLoanDto) {
    // cek buku ada atau tidak
    const book = await this.prisma.book.findUnique({
      where: { id: dto.bookId },
    });

    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    // (opsional) cek apakah buku sedang dipinjam
    const activeLoan = await this.prisma.loan.findFirst({
      where: {
        bookId: dto.bookId,
        status: 'BORROWED',
      },
    });

    if (activeLoan) {
      throw new BadRequestException('Buku sedang dipinjam');
    }

    return this.prisma.loan.create({
      data: {
        userId: dto.userId,
        bookId: dto.bookId,
      },
    });
  }

  // Pengembalian buku
  async returnBook(loanId: number) {
    const loan = await this.prisma.loan.findUnique({
      where: { id: loanId },
    });

    if (!loan) {
      throw new NotFoundException('Data peminjaman tidak ditemukan');
    }

    if (loan.status === 'RETURNED') {
      throw new BadRequestException('Buku sudah dikembalikan');
    }

    return this.prisma.loan.update({
      where: { id: loanId },
      data: {
        status: 'RETURNED',
        returnDate: new Date(),
      },
    });
  }

  // Riwayat peminjaman user
  async findByUser(userId: number) {
    return this.prisma.loan.findMany({
      where: { userId },
      include: {
        book: true,
      },
    });
  }

  // Semua peminjaman aktif
  async findActive() {
    return this.prisma.loan.findMany({
      where: { status: 'BORROWED' },
      include: {
        user: true,
        book: true,
      },
    });
  }
}
