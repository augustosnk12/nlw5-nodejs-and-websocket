import { Repository, EntityRepository } from "typeorm";

import { Connection } from "../entities/Connections";

@EntityRepository(Connection)
class ConnectionsRepository extends Repository<Connection> {}

export { ConnectionsRepository };

//stop at 54
