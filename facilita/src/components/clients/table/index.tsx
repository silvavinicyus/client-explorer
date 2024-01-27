import { IClient } from '../../../interfaces/iClient'
import './styles.css'
import { MdDelete } from "react-icons/md";

interface IClientsTableProps {
  clients: IClient[]
  onDeleteClient: ({uuid}: {uuid: string}) => void
}

const ClientsTable = ({onDeleteClient, clients}: IClientsTableProps) => {

  return (
    <>
      <table>
        <thead>
          <tr>
            <th> ID </th>
            <th> Nome </th>
            <th> Email </th>
            <th> Telefone </th>
            <th> Endereço </th>
            <th> Data de criação </th>
            <th> Ações </th>
          </tr>
        </thead>
        <tbody>        
          {
            clients.map((client) => {
              return (
                <tr key={client.id}>
                  <td>
                    {client.id}
                  </td>
                  <td>
                    {client.name}
                  </td>
                  <td>
                    {client.email}
                  </td>
                  <td>
                    {client.phone}
                  </td>
                  <td>
                    {client.address}
                  </td>
                  <td>
                    {new Date(client.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <MdDelete onClick={() => onDeleteClient({uuid: client.uuid})}/>
                  </td>
                </tr>             
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}


export { ClientsTable }