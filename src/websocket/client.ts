import { io } from "../http";

import { ConnectionService } from "../services/ConnectionsService";
import { UserService } from "../services/UsersServices";
import { MessageService } from "../services/MessagesService";

interface IParams {
  text: string;
  email: string;
}

io.on("connect", (socket) => {
  const connectionService = new ConnectionService();
  const userService = new UserService();
  const messageService = new MessageService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    let user_id = null;

    //search user by its email
    const userExists = await userService.findByEmail(email);

    if (!userExists) {
      //create a new user if it does not exists
      const user = await userService.create(email);

      //create a new connection row
      await connectionService.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;

      const connection = await connectionService.findUserById(userExists.id);

      if (!connection) {
        //create a new connection row
        await connectionService.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;

        //overwrite connection
        await connectionService.create(connection);
      }
    }

    await messageService.create({
      text,
      user_id,
    });
  });
});
