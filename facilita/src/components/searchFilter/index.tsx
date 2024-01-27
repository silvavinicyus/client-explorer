import { MenuItem, Select } from "@mui/material"
import { useState } from "react"
import './styles.css'

interface ISearchFilterProps {
  onSearch: ({target, value}: {target: string, value: string}) => void
}

const SearchFilter = ({onSearch}: ISearchFilterProps) => {

  const [target, setTarget] = useState('');
  const [value, setValue] = useState('name');

  const handleSearch = () => {
    onSearch({target: target, value: value})

    console.log({target: target, value: value})
  }

  return (
    <>
      <section>
        <Select
          id="tilter-target"          
          value={target}
          displayEmpty
          onChange={(event) => setTarget(event.target.value)}
          size="small"          
        >
          <MenuItem value="">
            <em>Campo</em>
          </MenuItem>
          <MenuItem value='name'>Nome</MenuItem>
          <MenuItem value='phone'>Telefone</MenuItem>
          <MenuItem value='email'>Email</MenuItem>
        </Select>

        <input type="text" onChange={(event) => setValue(event.target.value)}/>

        <button onClick={handleSearch}> Filtrar </button>        
        
      </section>
    </>
  )
}

export { SearchFilter };