import { IClientEntity } from "@domain/entities/client";

export class ClientMapper {
  static toEntity(row: any): IClientEntity {
    const clientEntity: IClientEntity =  {
      id: row['id'],
      uuid: row['uuid'],
      name: row['name'],
      email: row['email'],
      phone: row['phone'],
      address: row['address'],
      created_at: row['name'],
      updated_at: row['updated_at'],
    }

    return clientEntity
  }

  static toEntityArray(rows: any[]): IClientEntity[] {
    const clientEntities: IClientEntity[] = []

    rows.forEach((row) => {
      const clientEntity: IClientEntity =  {
        id: row['id'],
        uuid: row['uuid'],
        name: row['name'],
        email: row['email'],
        phone: row['phone'],
        address: row['address'],
        created_at: row['created_at'],
        updated_at: row['updated_at'],
      }

      clientEntities.push(clientEntity)
    })
    
    return clientEntities
  }
}