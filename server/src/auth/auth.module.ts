import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [
    //Improting the Entity from database
    TypeOrmModule.forFeature([UserEntity]),
    //Importing the JWT module and basic configuratin 
    JwtModule.register({
      //Protect the secret in .env
      secret: 'JWT_SECRET_TEST',
      signOptions: { expiresIn: '1h' },
    }),
    //Importing our custom Bcrypt Module
    BcryptModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  //Dont forget to export Services when injecting in other modules
  exports: [AuthService],
})
export class AuthModule {}
