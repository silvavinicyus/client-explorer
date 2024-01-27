import { ChangeEvent, FormEvent, useState } from "react";
import { facilitaApi } from "../../../services/axios";
import './styles.css'
interface ICreateClientProps {
  onCreated: () => void  
}

const CreateClient = ({onCreated}: ICreateClientProps) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const { createClient } = facilitaApi()
   
  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;    

    setFormData({
        ...formData,
        [name]: value
    });
}

  async function handleSubmit(event: FormEvent) {        
    event.preventDefault();

    try {
      const response = await createClient({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      })

      if (response.status != 201) {
        alert("Ocorreu um erro durante a criação do cliente, por favor tente novamente mais tarde!")
      }      
    } catch(err) {
      alert("Ocorreu um erro durante a criação do cliente, por favor tente novamente mais tarde!")
    } finally {
      onCreated()
    }
  }

  return (
    <form onSubmit={handleSubmit}>    
      <div className="form-body">
        <p> Novo Cliente</p>

        <div className="label-input">
          <label> Nome </label>
          <input type="text" placeholder="João Lucas" name="name" onChange={handleInputChange}/>
        </div>
        
        <div className="label-input">
          <label> Email </label>  
          <input type="text" placeholder="joao@email.com" name="email" onChange={handleInputChange}/>
        </div>

        <div className="label-input">        
          <label> Telefone </label>
          <input type="text" placeholder="82 981818181" name="phone" onChange={handleInputChange}/>
        </div>

        <div className="label-input">
          <label> Endereco </label>
          <input type="text" placeholder="1, 1" name="address" onChange={handleInputChange}/>
        </div>


        <div className="action-buttons">
          <button type="submit">Cadastrar</button>        
        </div>
      </div>      
    </form>
  )
}

export { CreateClient };