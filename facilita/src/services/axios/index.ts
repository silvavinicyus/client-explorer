/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { IClient, ICreateClientBody, IFindAllClientsResponse, IUpdateClientBody } from "../../interfaces/iClient";

export interface IAxiosResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

const facilitaApi = () => {
  async function createClient (body: ICreateClientBody): Promise<IAxiosResponse<IClient>> {
    return api.post('/clients', body)
  } 

  async function findAllClients(): Promise<IAxiosResponse<IFindAllClientsResponse>> {
    return api.get('/clients')
  }

  async function getRoutes(): Promise<IAxiosResponse<IClient[]>> {
    return api.get('/clients/adresses/path')
  }

  async function deleteClient(uuid: string): Promise<IAxiosResponse<void>> {
    return api.delete(`/clients/${uuid}`)
  }

  async function updateClient(props: IUpdateClientBody) {
    return api.put(`/clients/${props.uuid}`, props.body)    
  }


  return {
    createClient,
    findAllClients,
    getRoutes,
    deleteClient,
    updateClient
  }
}


export { facilitaApi };
