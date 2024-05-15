import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConfig } from './config/jwt/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user';

@Module({
  imports: [
    JwtModule.registerAsync({ ...jwtConfig, global: true }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
