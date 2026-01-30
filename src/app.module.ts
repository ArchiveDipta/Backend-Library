import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoanModule } from './loan/loan.module';
@Module({
imports: [PrismaModule, BooksModule, MembersModule, AuthModule, UserModule, LoanModule,
ConfigModule.forRoot({
isGlobal: true,
envFilePath:
process.env.NODE_ENV === 'production'
? '.env.production'
: '.env',
}),
],
})
export class AppModule {}
