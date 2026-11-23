import { useId } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import type { SelectOption } from '../../types/dashboard'

interface SelectFilterProps {
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

export default function SelectFilter({
  label,
  value,
  options,
  onChange,
}: SelectFilterProps) {
  const id = useId()

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value)
  }

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: { md: 220 } }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        label={label}
        value={value}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
