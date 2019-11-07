import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CoreModule } from '../core/core.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../common/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    CoreModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secretOrPrivateKey: config.jwtSecret,
        signOptions: {
          expiresIn: config.expiresIn,
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}