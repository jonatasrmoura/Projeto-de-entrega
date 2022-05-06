import { Router } from "express";

import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";

import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/FindAllAvailable/FindAllAvailableController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();

const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/client", createClientController.handle);

routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);

routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle);
routes.get("/delivery/available", ensureAuthenticateClient, findAllAvailableController.handle);

export { routes };
