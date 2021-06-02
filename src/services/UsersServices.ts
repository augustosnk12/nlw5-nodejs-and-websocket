import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserService {
  async create(email: string) {
    const userRepository = getCustomRepository(UsersRepository);

    //check if user exists
    const userExists = await userRepository.findOne({ email });

    //if exists return the found user
    if (userExists) return userExists;

    //create new if it's a new user
    const user = userRepository.create({ email });

    await userRepository.save(user);

    return user;
  }
}

export { UserService };
