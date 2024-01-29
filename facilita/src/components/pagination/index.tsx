import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import './styles.css';
import { useState } from "react";

interface ITablePaginationProps {
  onLeft: () => void
  onRight: () => void
  onChangeCount: (count: number) => void
  currentPage: number
  currentCount: number
}

const TablePagination = ({ onChangeCount, onLeft, onRight, currentPage, currentCount }: ITablePaginationProps) => {  
  const [value, setValue] = useState(currentCount)    
  const handleChange = (event: SelectChangeEvent) => {    
    setValue(Number(event.target.value))
    onChangeCount(Number(event.target.value))
  }

  return (
    <>
      <div className="buttons"> 
        <FaAngleLeft className="left-button" onClick={onLeft}/>
        <span>{currentPage+1}</span>        
        <FaAngleRight className="right-button" onClick={onRight} />

        <Select
          id="count-pagination-select"
          onChange={handleChange}
          size="small"
          displayEmpty
          value=""
          style={{height: 25}}         
        >
          <MenuItem value="">
            <em>{value}</em>
          </MenuItem>

          <MenuItem value={10}> 10 </MenuItem>
          <MenuItem value={25}> 25 </MenuItem>
          <MenuItem value={50}> 50 </MenuItem>
          <MenuItem value={100}> 100 </MenuItem>
        </Select>
      </div>
    </>
  )
}

export { TablePagination };
