/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './App.css';
import { CreateClient } from './components/clients/creation';
import { ClientsTable } from './components/clients/table';
import { IClient, IFindAllClientsQueryStringProps } from './interfaces/iClient';
import { facilitaApi } from './services/axios';
import { PathsToClient } from './components/clients/Path';
import { SearchFilter } from './components/searchFilter';

function App() {  

  const [openCreateModal, setOpenCreateModal] = useState(false);  
  const { findAllClients, deleteClient } = facilitaApi();
  const [clients, setClients] = useState<IClient[]>([]);

  const [openRoutesModal, setOpenRoutesModal] = useState(false);

  const fetchClientData = async (props: IFindAllClientsQueryStringProps) => {
    const response = await findAllClients(props)

    if(response.status != 200)  {
      return alert('Erro ao carregar clientes!')
    }        
    
    setClients(response.data.items)        
  }

  useEffect(() => {
    try {      
      fetchClientData({
        page: 0,
        count: 10
      })
    } catch(err) {
      console.log(err)
      alert("Erro ao carregar clientes")
    }
  }, [])

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
            count: 10,
            page: 0,
            name: value
          })
          break
        case 'email':
          fetchClientData({
            count: 10,
            page: 0,
            email: value
          })
          break
        case 'phone':
          fetchClientData({
            count: 10,
            page: 0,
            phone: value
          })
          break
      }
        
    } catch(err) {
      console.error(err)
      alert("Erro ao filtrar clientes!")
    }
  }

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
      <ClientsTable clients={clients} onDeleteClient={handleDelete}/>

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
