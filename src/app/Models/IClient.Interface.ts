import { IAddress } from "./IAddress.interface";

export interface IClient{
    id: number,
    name: string,
    address: IAddress,
    phone: string,
    statusEnum: StatusEnum,
    createdDate: string,
    updatedDate: string,
}

export interface IClienteCadastro{
    name: string,
    address: IAddress,
    phone: string,
    statusEnum: StatusEnum,
    createdDate: string,
    updatedDate: string,
}

export enum StatusEnum {
    isBuild = 'isBuild',
    isReform = 'isReform',
    isFinally = 'isFinally'
}