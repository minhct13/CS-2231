import React from "react";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function CustomSelect({ name, options, selected, setSelected }) {
    const isAllSelected = options.length > 0 && selected.length === options.length;

    const handleChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setSelected(selected.length === options.length ? [] : options);
            return;
        }
        setSelected(value);
    };

    return (
        <FormControl style={{ width: 180 }}>
            <Select
                labelId="mutiple-select-label"
                multiple
                value={selected}
                onChange={handleChange}
                displayEmpty={true}
                renderValue={(selected) => !selected.length ? "Select " + name :
                    selected.length === 1 ? selected[0] :
                        isAllSelected ? "Select All" : "Multiple Select"
                }
            >
                <MenuItem
                    value="all"
                    classes={{
                    }}
                >
                    <ListItemIcon>
                        <Checkbox
                            checked={isAllSelected}
                            indeterminate={
                                selected.length > 0 && selected.length < options.length
                            }
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary="Select All"
                    />
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        <ListItemIcon>
                            <Checkbox checked={selected.indexOf(option) > -1} />
                        </ListItemIcon>
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default CustomSelect;
