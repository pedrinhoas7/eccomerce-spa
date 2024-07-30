import ClientDTO from "src/DTO/ClientDTO"
import { Delete, Get, Patch, Post, Put} from "./BaseService"


export default {
  getAll() {
    return Get<ClientDTO[]>('/Clients');
  },
  create(client : ClientDTO) {
    return Post('/Clients', client);
  },
  update(id: string, client : ClientDTO) {
    return Put(`/Clients/${id}`, client);
  },
  getById(id: string) {
    return Get<ClientDTO[]>(`/Clients/${id}`);
  },
  delete(id: string) {
    return Delete(`/Clients/${id}`);
  }
}