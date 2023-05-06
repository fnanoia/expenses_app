import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    //Injecting User Repsitory
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    //Injecting JWT Service
    private jwtAuthService: JwtService,
    //Injecting custom Bcrypt service
    private bcryptService: BcryptService,
  ) {}

  async registerUser(registerAuthDto: RegisterAuthDto): Promise<UserEntity> {
    try {
      //Encrypting the password from Dto(Register form)
      const password = await this.bcryptService.hashPassword(
        registerAuthDto.password,
      );

      //Edit password to submit
      const user = await this.userRepository.create({
        ...registerAuthDto,
        password,
      });

      //Save in database
      await this.userRepository.save(user);
     
      return user;
    } catch (err: any) {
      //Error handling
      throw new HttpException(
        'Error creating user in auth ' + err,
        HttpStatus.BAD_REQUEST,
      );
    }
  }



  async loginUser(loginAuthDto: LoginAuthDto) {
    //Seraching in database from Dto(Login form)
    const user = await this.userRepository.findOne({
      where: { email: loginAuthDto.email },
    });

    //Validations
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    //Comparing password from input with the one stored in database
    const comparePassword = await this.bcryptService.comparePassword(
      loginAuthDto.password,
      user.password,
    );

    //Validations
    if (!comparePassword) {
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }

    //Signing the token
    const payload = { id: user.id, email: user.email };
    const token = this.jwtAuthService.sign(payload);

    //Returning the token for handling in the client side
    return { user, token, message: 'User succesfully auth' };
  }
  
}
