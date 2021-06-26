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

  /**
   * Get connection
   */
  async findUserById(user_id: string) {
    const connection = this.connectionsRepository.findOne({ user_id });

    return connection;
  }

  /**
   * Get all opened connections
   */
  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"],
    });
    return connections;
  }

  /**
   * Get connection by socket_id
   */
  async findBySocketId(socket_id: string) {
    const connection = await this.connectionsRepository.findOne({
      socket_id,
    });

    return connection;
  }

  /**
   * Update state of the connection
   */
  async updateAdminId(user_id: string, admin_id: string) {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where("user_id = :user_id", {
        user_id,
      })
      .execute();
  }
}

export { ConnectionService };
