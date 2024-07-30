import ClientDTO from "src/DTO/ClientDTO"
import { Delete, Get, Patch, Post, Put} from "./BaseService"


export default {
  getAll() {
    return Get<ClientDTO[]>('api/Clients');
  },
  create(client : ClientDTO) {
    return Post('api/Clients', client);
  },
  update(id: string, client : ClientDTO) {
    return Put(`api/Clients/${id}`, client);
  },
  getById(id: string) {
    return Get<ClientDTO>(`api/Clients/${id}`);
  },
  delete(id: string) {
    return Delete(`api/Clients/${id}`);
  }
}