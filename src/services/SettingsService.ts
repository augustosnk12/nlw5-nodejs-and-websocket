import { getCustomRepository } from "typeorm";
import { SettingRepository } from "../repositories/SettingsRepositories";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingService {
  async create({ chat, username }: ISettingsCreate) {
    const settingsRepository = getCustomRepository(SettingRepository);

    //verify if user already exists
    const userAlreadyExists = await settingsRepository.findOne({
      username,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const settings = settingsRepository.create({
      chat,
      username,
    });

    await settingsRepository.save(settings);

    return settings;
  }
}

export { SettingService };
