import SearchIcon from '@mui/icons-material/Search';
import { Popover } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import CustomSelect from './Select';

function SearchBar(props) {
  const { lesson, dispatch } = props
  const [topic, setTopic] = useState([])
  const [scope, setScope] = useState([])
  const [search, setSearch] = useState([])
  const ref = useRef(null)
  useEffect(() => { console.log(topic); }, [topic])
  useEffect(() => { console.log(scope); }, [scope])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(ref.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const mapScope = {
    "Giới thiệu/Khái niệm": "introduction",
    "Công thức/Tính chất": "formulas",
    "Ví dụ/Bài tập và phương pháp giải": "examples"
  }

  const handleChange = (e) => {
    let temp = lesson.data
    if (topic.length)
      temp = temp.filter(x => topic.some(t => x.topic.indexOf(t) > -1))
    temp = temp.filter(x => (scope.length ? scope : ["Giới thiệu/Khái niệm", "Công thức/Tính chất", "Ví dụ/Bài tập và phương pháp giải"]).some(s =>
      x[mapScope[s]].title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ||
      x[mapScope[s]].content.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    ))
    setSearch(temp);
  };

  return (
    <div style={{ width: "100%" }}>
      <Paper ref={ref}
        component="form" id={id}
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", height: "fit-content" }}
      >
        <InputBase
          onChange={handleChange}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleClick}>
          <SearchIcon />
        </IconButton>
        <Divider sx={{ m: 0.5 }} orientation="vertical" />
        <CustomSelect name="Topic" options={lesson.topic} selected={topic} setSelected={setTopic} />
        <Divider sx={{ m: 0.5 }} orientation="vertical" />
        <CustomSelect name="Scope" options={["Giới thiệu/Khái niệm", "Công thức/Tính chất", "Ví dụ/Bài tập và phương pháp giải"]} selected={scope} setSelected={setScope} />
      </Paper>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        {search.length ? search.map((l, i) =>
          <div key={i} dangerouslySetInnerHTML={{ __html: l.title }}
            style={{ fontSize: 8, whiteSpace: "break-spaces" }}
            onClick={() => {
              dispatch({ type: "lesson/saveState", payload: { current: lesson.data.indexOf(l) } })
              handleClose()
            }} />) : "Nothing to show"}
      </Popover>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lesson: state.lesson,
});

export default connect(mapStateToProps)(SearchBar);