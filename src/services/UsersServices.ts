import { getCustomRepository, Repository } from "typeorm";

import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }
  async create(email: string) {
    //check if user exists
    const userExists = await this.userRepository.findOne({ email });

    //if exists return the found user
    if (userExists) return userExists;

    //create new if it's a new user
    const user = this.userRepository.create({ email });

    await this.userRepository.save(user);

    return user;
  }

  /**
   * get user by its email
   * @param email
   */
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }
}

export { UserService };
