/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './App.css';
import { CreateClient } from './components/clients/creation';
import { ClientsTable } from './components/clients/table';
import { IClient } from './interfaces/iClient';
import { facilitaApi } from './services/axios';
import { PathsToClient } from './components/clients/Path';

function App() {  

  const [openCreateModal, setOpenCreateModal] = useState(false);  
  const { findAllClients, deleteClient } = facilitaApi();
  const [clients, setClients] = useState<IClient[]>([]);

  const [openRoutesModal, setOpenRoutesModal] = useState(false);

  const fetchClientData = async () => {
    const response = await findAllClients()

    if(response.status != 200)  {
      return alert('Erro ao carregar clientes!')
    }        
    
    setClients(response.data.items)        
  }

  useEffect(() => {
    try {      
      fetchClientData()
    } catch(err) {
      console.log(err)
      alert("Erro ao carregar clientes")
    }
  }, [])

  const handleDelete = async ({uuid}: {uuid: string}) => {
    try {
      const response = await deleteClient(uuid)

      if (response.status !== 204) alert('Erro ao deletar cliente!')

      fetchClientData()
    } catch(err) {
      alert('Erro ao deletar cliente!')
    }
  }

  const handleCreate = async() => {
    fetchClientData()
    onCloseCreateModal()
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
