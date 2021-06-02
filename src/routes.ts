import { Router } from "express";

import { SettingsController } from "./controllers/SettingsControllers";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const settingController = new SettingsController();
const userController = new UsersController();

routes.post("/settings", settingController.create);
routes.post("/users", userController.create);

export { routes };
