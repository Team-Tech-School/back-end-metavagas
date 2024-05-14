import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConfig } from './Config/Jwt/jwt.config';

@Module({
  imports: [JwtModule.registerAsync({ ...jwtConfig, global: true })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
