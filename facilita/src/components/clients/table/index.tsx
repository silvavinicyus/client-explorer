import { MdDelete } from "react-icons/md";
import { IClient } from '../../../interfaces/iClient';
import { TablePagination } from '../../pagination';
import './styles.css';

interface IPaginationProps {
  onLeft: () => void
  onRight: () => void
  onChangeCount: (count: number) => void
  currentPage: number
  currentCount: number
}

interface IClientsTableProps {
  clients: IClient[]
  onDeleteClient: ({uuid}: {uuid: string}) => void
  pagination: IPaginationProps
}

const ClientsTable = ({onDeleteClient, clients, pagination}: IClientsTableProps) => {    

  return (
    <>
      <table>
        <thead>
          <tr className="column-titles">
            <th className="id-column"> ID </th>
            <th> Nome </th>
            <th className="email-column"> Email </th>
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
                    <MdDelete className='delete-button' onClick={() => onDeleteClient({uuid: client.uuid})}/>
                  </td>
                </tr>             
              )
            })
          }
        </tbody>        
      </table>
      
      <TablePagination onRight={pagination.onRight} onLeft={pagination.onLeft} currentPage={pagination.currentPage} currentCount={pagination.currentCount} onChangeCount={pagination.onChangeCount}/>        
    </>
  )
}


export { ClientsTable };
