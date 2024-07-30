export default interface ClientDTO {
    id?: string;
    name: string;
    email: string;
    phone: string;
    creationDate: Date;
    isBlocked: boolean;
    typeClient: TypeClient;
    password?: string | null;
    documentName: string;
    documentIdentifier: string;
    inscricaoEstadual?: string;
    typeGender: TypeGender;
    birthDate: Date;
}

export enum TypeClient {
    Fisica = 0,
    Juridica = 1
}

export enum TypeGender {
    Masculino = 0,
    Feminino = 1,
    Outro = 2
}
