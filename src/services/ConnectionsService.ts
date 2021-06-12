import { getCustomRepository, Repository } from "typeorm";

import { Connection } from "../entities/Connections";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
  admin_id?: string;
  id?: string;
  socket_id: string;
  user_id: string;
}

class ConnectionService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  /**
   * Create a new Connection
   */
  async create({ admin_id, id, socket_id, user_id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      admin_id,
      id,
      socket_id,
      user_id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }
}

export { ConnectionService };
