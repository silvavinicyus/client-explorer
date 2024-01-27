/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { facilitaApi } from "../../../services/axios"
import { IClient } from "../../../interfaces/iClient";

const PathsToClient = () => {
  const { getRoutes } = facilitaApi();
  const [clients, setClients] = useState<IClient[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getRoutes();
  
        if (response.status !== 200) {
          alert("Houve um erro durante a busca da melhor rota!");
        }
          
        setClients(response.data);
      } catch (err) {        
        alert('Erro durante a busca da melhor rota.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <>           
      {        
        isLoading 
          ? <h1>Carregando rota...</h1> 
          : clients.map((client) => (
              <h3>
                { client.address }
              </h3>
            ))
      }      
    </>
  ) 
}

export { PathsToClient }