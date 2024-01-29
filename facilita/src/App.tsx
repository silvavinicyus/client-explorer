/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './App.css';
import { CreateClient } from './components/clients/creation';
import { PathsToClient } from './components/clients/path';
import { ClientsTable } from './components/clients/table';
import { SearchFilter } from './components/searchFilter';
import { IClient, IFindAllClientsQueryStringProps } from './interfaces/iClient';
import { facilitaApi } from './services/axios';

function App() {  

  const [openCreateModal, setOpenCreateModal] = useState(false);  
  const { findAllClients, deleteClient } = facilitaApi();
  const [clients, setClients] = useState<IClient[]>([]);
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(10)
  const [openRoutesModal, setOpenRoutesModal] = useState(false);
  const [totalClients, setTotalClients] = useState(0)
  
  const fetchClientData = async (props: IFindAllClientsQueryStringProps) => {
    const response = await findAllClients(props)

    if(response.status != 200)  {
      alert('Erro ao carregar clientes, tente novamente mais tarde!')
    }        
    
    setTotalClients(response.data.count)
    setClients(response.data.items)
  }
  
  const handleDelete = async ({uuid}: {uuid: string}) => {
    try {
      const response = await deleteClient(uuid)

      if (response.status !== 204) alert('Erro ao deletar cliente!')

      fetchClientData({
        page: 0,
        count: 10
      })
    } catch(err) {
      alert('Erro ao deletar cliente!')
    }
  }

  const handleCreate = async() => {
    fetchClientData({
      page: 0,
      count: 10
    })
    onCloseCreateModal()
  }

  const handleFilter = async ({target, value}: {target: string, value: string}) => {
    try {
      switch (target){
        case 'name':
          fetchClientData({
            count: count,
            page: page,
            name: value
          })
          break
        case 'email':
          fetchClientData({
            count: count,
            page: page,
            email: value
          })
          break
        case 'phone':
          fetchClientData({
            count: count,
            page: page,
            phone: value
          })
          break
      }
        
    } catch(err) {
      console.error(err)
      alert("Erro ao filtrar clientes!")
    }
  }

  const validatePageChange = (pageResult: number): boolean => {
    const maximumPages = (totalClients / count % 2 === 0 ? totalClients / count : ((totalClients / count) + 1)) - 1


    if (totalClients <= count) {
      return false
    }

    if (pageResult < 0 || pageResult > maximumPages) {
      return false
    } 

    return true
  }

  useEffect(() => {    
    try {      
      fetchClientData({
        page: page,
        count: count
      })
    } catch(err) {
      console.log(err)
      alert("Erro ao carregar clientes")
    }
  },[count, page])

  const onOpenCreateModal = () => setOpenCreateModal(true);
  const onCloseCreateModal = () => setOpenCreateModal(false);

  const onOpenRoutesModal = () => setOpenRoutesModal(true);
  const onCloseRoutesModal = () => setOpenRoutesModal(false);
  
  return (
    <>            
      <h1>Dashboard de clientes</h1>
      
      <div className='subtitle'>
        <button onClick={onOpenCreateModal}> Adicionar Cliente </button>
        <button onClick={onOpenRoutesModal}> Gerar rota </button>
      </div>      
      
      <SearchFilter onSearch={handleFilter}/>

      <ClientsTable clients={clients} 
        onDeleteClient={handleDelete} 
        pagination={
          {
            currentCount: count,
            currentPage: page,
            onRight: () => {
              const pageResult = page+1
              validatePageChange(pageResult) && setPage(pageResult)
            },
            onLeft: () => {
            const pageResult = page-1
              validatePageChange(pageResult) && setPage(pageResult)
            },
            onChangeCount: (value: number) => {          
              setCount(value)
            }
          }
        }                
      />                   
      
      <Modal classNames={{modal: 'modal'}} open={openCreateModal} onClose={onCloseCreateModal} center>
        <CreateClient onCreated={handleCreate}/>        
      </Modal>

      <Modal classNames={{modal: 'modal'}} open={openRoutesModal} onClose={onCloseRoutesModal} center>
        <PathsToClient />        
      </Modal>
    </>

  )
}

export default App;
