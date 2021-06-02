import { Request, Response } from "express";

import { UserService } from "../services/UsersServices";

class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      const userService = new UserService();

      const users = await userService.create(email);

      return res.json(users);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      }); 
    }
  }
}

export { UsersController };
