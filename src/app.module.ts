import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database';
import { UsersModule } from './users';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './companys/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CompanyModule,
  ],
})
export class AppModule {}
