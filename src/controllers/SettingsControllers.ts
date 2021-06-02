import { Request, Response } from "express";

import { SettingService } from "../services/SettingsService";

class SettingsController {
  async create(req: Request, res: Response) {
    try {
      const { chat, username } = req.body;

      const settingService = new SettingService();

      const settings = await settingService.create({ chat, username });

      return res.json(settings);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      }); 
    }
  }
}

export { SettingsController };
