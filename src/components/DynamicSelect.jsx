import React, { useEffect } from "react";
import { TextField, MenuItem, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOptions, setSelectedFilter } from "../redux/slices/dynamicSelectSlice";

export default function DynamicSelect({ colDef, value: propValue, onChange }) {
    const dispatch = useDispatch();

    const options = useSelector(
        (state) => state.dynamicSelect.options[colDef.def] || []
    );
    const loading = useSelector(
        (state) => state.dynamicSelect.loading[colDef.def] || false
    );
    const selectedValue = useSelector(
        (state) => state.dynamicSelect.selectedFilters[colDef.def] || ""
    );

    useEffect(() => {
        if (!options.length) {
            dispatch(fetchOptions(colDef.def));
        }
    }, [colDef.def]);

    const handleChange = (val) => {
        dispatch(setSelectedFilter({ column: colDef.def, value: val })); // store in redux
        if (onChange) onChange(val); // call parent callback
    };

    return (
        <TextField
            select
            label={colDef.label}
            value={propValue !== undefined ? propValue : selectedValue}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth
            margin="normal"
        >
            {loading ? (
                <MenuItem disabled>
                    <CircularProgress size={20} /> Loading...
                </MenuItem>
            ) : (
                options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))
            )}
        </TextField>
    );
}
