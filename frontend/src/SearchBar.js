import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CustomSelect from './Select';

export default function SearchBar() {
  const [topic, setTopic] = useState([])
  useEffect(() => { console.log(topic); }, [topic])
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", height: "fit-content" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ m: 0.5 }} orientation="vertical" />
      <CustomSelect options={[1, 2, 3, 4, 5]} selected={topic} setSelected={setTopic} />
      <Divider sx={{ m: 0.5 }} orientation="vertical" />
      {/* <CustomSelect /> */}
    </Paper>
  );
}
