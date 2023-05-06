import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

//Creating custom service
//Can be injected in any module. We are using this service in our AuthModule to handle
//password encryption
@Injectable()
export class BcryptService {

  //Generating the salt. Protected method
  private async genSalt(): Promise<number> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return parseInt(salt);
  }

  //Method for hashing the password
  async hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, await this.genSalt());
    return hashPassword;
  }

  //Method for comparing the password
  async comparePassword(password: string, hash: string) {
    const comparePassword = await bcrypt.compare(password, hash);
    return comparePassword;
  }
}
