import { Router } from "express";

import { SettingsController } from "./controllers/SettingsControllers";

const routes = Router();

const settingController = new SettingsController();

routes.post("/settings", settingController.create);

export { routes };
