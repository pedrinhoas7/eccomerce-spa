import ClientDTO from "src/DTO/ClientDTO"
import { Delete, Get, Post, Put} from "./BaseService"
import VerifyRegisterDTO from "src/DTO/VerifyRegisterDTO";


export default {
  getAll() {
    return Get<ClientDTO[]>('api/Clients');
  },
  VerifyRegister(VerifyRegister: VerifyRegisterDTO) {
    return Post<VerifyRegisterDTO, boolean>(`api/Clients/VerifyRegister`, VerifyRegister);
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