import { ITravelingSalesmangService } from "@business/services/tsp/iTsp";
import { IClientEntity } from "@domain/entities/client";
import { injectable } from "inversify";

interface IClientAddress {
  id: number
  x: number
  y: number
}
@injectable()
export class TravelingSalesmanService implements ITravelingSalesmangService {  
  bestPath(clients: IClientEntity[]): IClientEntity[] {
    let clientsAdress: IClientAddress[] = clients.map((client) => {
      const address = client.address.replace(' ', '').split(',')
      return {
        id: client.id,
        x: +address[0],
        y: +address[1]
      }
    })
    

    const company: IClientAddress = {
      id: 0,
      x: 0, 
      y: 0
    }


    const route: IClientAddress[] = [company]

    while (clientsAdress.length > 0) {
      const nextClient = this.findClosestNeighbor(route[route.length-1], clientsAdress)

      route.push(nextClient)

      clientsAdress = clientsAdress.filter((client) => client !== nextClient)
    }

    return clients
  }

  // Metodo euclidiano para encontrar a distancia entre dois pontos
  private getDistanceBetween(startingClient: IClientAddress, targetClient: IClientAddress): number {
    const deltaX = startingClient.x - targetClient.x
    const deltaY = startingClient.y - targetClient.y

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  }

  // Busca no array de clientes quem é o vizinho mais próximo
  private findClosestNeighbor(currentClient: IClientAddress, clients: IClientAddress[]): IClientAddress {
    let shortestDistance = Number.MAX_VALUE
    let closestNeighbor: IClientAddress = null

    clients.forEach((client) => {
      const distanceBetween = this.getDistanceBetween(currentClient, client)

      if (distanceBetween < shortestDistance) {
        shortestDistance = distanceBetween
        closestNeighbor = client
      }
    })
        
    return closestNeighbor
  }
}