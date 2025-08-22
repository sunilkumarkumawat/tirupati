import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Tooltip, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, 
  IconButton, Menu, MenuItem, Checkbox, CircularProgress, Dialog, DialogTitle, 
  DialogContent, DialogActions, Button, TextField, TablePagination, FormControlLabel
} from '@mui/material';
import { 
  Menu as MenuIcon, Search as SearchIcon, Delete as DeleteIcon, 
  AddCircleOutline as AddCircleOutlineIcon, Refresh as RefreshIcon, 
  FileDownload as FileDownloadIcon, EditSquare as EditIcon, 
  FilterList as FilterListIcon, Visibility as VisibilityIcon
} from '@mui/icons-material';
import userImg from "../../assets/images/user/admin.jpg";
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import BookAppointment from './BookAppointment';
import DynamicSelect from '../../components/DynamicSelect';

  const API_BASE_URL = import.meta.env.VITE_API_URL;
// API service
const apiService = {
  getAppointments: async (page, rowsPerPage, filters = {}, search = '') => {
    try {
      const queryParams = new URLSearchParams({
        page: page + 1, // API pages are usually 1-based
        limit: rowsPerPage,
        search,
        ...filters
      });
      
      const response = await fetch(`${API_BASE_URL}/getAppointments?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any auth headers if needed
          // 'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      
      const data = await response.json();
      return {
        data: data.appointments,
        total: data.total,
      };
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  deleteAppointment: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deleteAppointments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any auth headers if needed
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }
      return true;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }
};

const View = ({
  title = 'Appointment',
  items = ['Appointments'],
  activeItem = 'View',
  columnDefinitions = [
    { def: 'select', type: 'check' },
    { def: 'patient_name', label: 'Name', type: 'text' },
    { def: 'patient_mobile', label: 'Mobile', type: 'phone' },
     { def: 'specialist_id', label: 'Doctor', type: 'text' },
    { def: 'gender', label: 'Gender', type: 'text' },
    { def: 'created', label: 'Date', type: 'date' },
    // { def: 'time', label: 'Time', type: 'time' },
    // { def: 'email', label: 'Email', type: 'email' },
    { def: 'appointment_status', label: 'Appointment Status', type: 'text' },

    { def: 'actions', type: 'actionBtn' },
  ],
  isLoading = false,
}) => {
  const [selection, setSelection] = useState(new Set());
  const [filter, setFilter] = useState('');
  const [anchorElContext, setAnchorElContext] = useState(null);
  const [contextMenuItem, setContextMenuItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dialogTitle, setDialogTitle] = useState('Add Appointment');
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    columnDefinitions.reduce((acc, col) => ({
      ...acc,
      [col.def]: col.type !== 'check' && col.type !== 'actionBtn'
    }), {})
  );
  const [columnFilters, setColumnFilters] = useState(
    columnDefinitions.reduce((acc, col) => ({
      ...acc,
      [col.def]: ''
    }), {})
  );
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, total } = await apiService.getAppointments(page, rowsPerPage, columnFilters, filter);
    
      setAppointments(data);
      setTotalRows(total);
    } catch (error) {
      console.error('Failed to load appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [page, rowsPerPage, filter]);

  const applyFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
    setPage(0);
   
  };

  const masterToggle = () => {
    const newSelection = new Set(selection);
    if (isAllSelected()) {
      newSelection.clear();
    } else {
      appointments.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        .forEach(row => newSelection.add(row));
    }
    setSelection(newSelection);
  };

  const isAllSelected = () => {
    const currentPageRows = appointments.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    return currentPageRows.every(row => selection.has(row));
  };

  const toggleRow = (row) => {
    const newSelection = new Set(selection);
    if (newSelection.has(row)) {
      newSelection.delete(row);
    } else {
      newSelection.add(row);
    }
    setSelection(newSelection);
  };

  const removeSelectedRows = async () => {
    setLoading(true);
    try {
      for (const row of selection) {
        await apiService.deleteAppointment(row.id);
      }
      await fetchAppointments();
      setSelection(new Set());
    } catch (error) {
      console.error('Failed to delete appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNew = () => {
    setSelectedAppointment(null);
    setDialogTitle('Add Appointment');
    setOpenDialog(true);
  };

  const editCall = (row) => {
    setSelectedAppointment(row);
    setDialogTitle('Edit Appointment');
    setOpenDialog(true);
  };

  const refresh = () => {
    setSelection(new Set());
    setFilter('');
    setColumnFilters(columnDefinitions.reduce((acc, col) => ({
      ...acc,
      [col.def]: ''
    }), {}));
    setPage(0);
    fetchAppointments();
  };

  const exportExcel = () => {
    console.log('Export Excel');
  };

  const deleteItem = async (row) => {
    setLoading(true);
    try {
      await apiService.deleteAppointment(row.id);
      await fetchAppointments();
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const onContextMenu = (event, row) => {
    event.preventDefault();
    setContextMenuItem(row);
    setAnchorElContext({ clientX: event.clientX, clientY: event.clientY });
  };

  const handleContextClose = () => {
    setAnchorElContext(null);
    setContextMenuItem(null);
  };

  const handleFormSubmit = async (data) => {
    // Assuming BookAppointment component handles the API call for add/edit
    setOpenDialog(false);
    setSelectedAppointment(null);
    await fetchAppointments();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleColumnVisibility = (columnDef) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnDef]: !prev[columnDef]
    }));
  };

  const handleFilterModalOpen = () => {
    setOpenFilterModal(true);
  };

  const handleFilterModalClose = () => {
    setOpenFilterModal(false);
  };

  const handleColumnFilterChange = (columnDef, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [columnDef]: value
    }));
  };

  const applyColumnFilters = () => {
    setOpenFilterModal(false);
    setPage(0);
      fetchAppointments();
  };

  return (
    <section className="content">
      <div className="content-block">
        <div className="block-header">
          <CustomBreadcrumb title={title} activeItem={activeItem} items={items} />
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="materialTableHeader">
                <div className="left">
                  <ul className="header-buttons-left ms-0">
                    <li className="tbl-title">
                      <h2>{title}</h2>
                    </li>
                    <li className="tbl-search-box">
                      <label htmlFor="search-input">
                        <SearchIcon sx={{ fontSize: 28 }} className="material-icons search-icon" />
                      </label>
                      <input
                        id="search-input"
                        placeholder="Search"
                        type="text"
                        ref={searchInputRef}
                        value={filter}
                        onChange={applyFilter}
                        className="browser-default search-field"
                        aria-label="Search box"
                      />
                    </li>
                  </ul>
                </div>
                <div className="right">
                  <div className="right-side-btn d-flex">
                    <IconButton onClick={addNew} title="Add">
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton onClick={refresh} title="Refresh">
                      <RefreshIcon />
                    </IconButton>
                    <IconButton onClick={exportExcel} title="Download Excel">
                      <FileDownloadIcon />
                    </IconButton>
                    <IconButton onClick={handleFilterModalOpen} title="Filters">
                      <FilterListIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => setAnchorElContext({ clientX: e.clientX, clientY: e.clientY })}
                      title="Show/Hide Columns"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <Menu
                open={Boolean(anchorElContext)}
                onClose={handleContextClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  anchorElContext ? { top: anchorElContext.clientY, left: anchorElContext.clientX } : undefined
                }
              >
                {contextMenuItem ? [
                  <MenuItem key="edit" onClick={() => { editCall(contextMenuItem); handleContextClose(); }}>
                    <EditIcon /> Edit
                  </MenuItem>,
                  <MenuItem key="delete" onClick={() => { deleteItem(contextMenuItem); handleContextClose(); }}>
                    <DeleteIcon /> Delete
                  </MenuItem>
                ] : columnDefinitions
                  .filter(col => col.type !== 'check' && col.type !== 'actionBtn')
                  .map(col => (
                    <MenuItem key={col.def}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={visibleColumns[col.def]}
                            onChange={() => toggleColumnVisibility(col.def)}
                          />
                        }
                        label={col.label}
                      />
                    </MenuItem>
                  ))
                }
              </Menu>
              <div className="overflow-auto">
                <div className="responsive_table">
                  <TableContainer>
                    <Table className="mat-cell advance-table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Checkbox
                              onChange={masterToggle}
                              checked={selection.size > 0 && isAllSelected()}
                              indeterminate={selection.size > 0 && !isAllSelected()}
                              color="primary"
                            />
                          </TableCell>
                          {columnDefinitions.map((column) => {
                            if (column.type === 'check' || column.type === 'actionBtn' || !visibleColumns[column.def]) {
                              return null;
                            }
                            return (
                              <TableCell key={column.def}>
                                {column.label}
                              </TableCell>
                            );
                          })}
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointments.map((row, index) => (
                          <TableRow
                            key={row.id || `row-${index}`}
                            onContextMenu={(e) => onContextMenu(e, row)}
                            style={{ cursor: 'pointer' }}
                          >
                            <TableCell>
                              <Checkbox
                                onClick={(e) => e.stopPropagation()}
                                onChange={() => toggleRow(row)}
                                checked={selection.has(row)}
                                color="primary"
                              />
                            </TableCell>
                            {columnDefinitions.map((column) => {
                              if (column.type === 'check' || column.type === 'actionBtn' || !visibleColumns[column.def]) {
                                return null;
                              }
                              return (
                                <TableCell
                                  key={column.def}
                                  className={column.def === "patient_name" ? "truncate-text" : ""}
                                  onClick={(e) => { e.stopPropagation(); editCall(row); }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
                                    {column.def === "patient_name" ? (
                                      <>
                                        {userImg && <img src={userImg} className="table-img" alt="image" />}
                                        <Tooltip title={row[column.def] || "N/A"}>
                                          <span className={["action", "check"].includes(column.def) ? "" : "truncate-15"}>
                                            {row[column.def]
                                              ? row[column.def].slice(0, 15) + (row[column.def].length > 15 ? "..." : "")
                                              : "N/A"}
                                          </span>
                                        </Tooltip>
                                      </>
                                    ) : column.type === "date" ? (
                                      <Tooltip
                                        title={
                                          row[column.def]
                                            ? new Date(row[column.def]).toLocaleDateString("en-US", {
                                                month: "2-digit",
                                                day: "2-digit",
                                                year: "numeric",
                                              })
                                            : "N/A"
                                        }
                                      >
                                        <span className={["action", "check"].includes(column.def) ? "" : "truncate-15"}>
                                          {row[column.def]
                                            ? new Date(row[column.def]).toLocaleDateString("en-US", {
                                                month: "2-digit",
                                                day: "2-digit",
                                                year: "numeric",
                                              })
                                            : "N/A"}
                                        </span>
                                      </Tooltip>
                                    ) : column.type === "time" ? (
                                      <>
                                        <span className="tbl-icon material-icons-outlined col-indigo">schedule</span>
                                        <Tooltip title={row[column.def] || "N/A"}>
                                          <span className={["action", "check"].includes(column.def) ? "" : "truncate-15"}>
                                            {row[column.def] || "N/A"}
                                          </span>
                                        </Tooltip>
                                      </>
                                    ) : column.type === "phone" ? (
                                      <>
                                        <span className="tbl-icon material-icons-outlined col-green">call</span>
                                        <Tooltip title={row[column.def] || "N/A"}>
                                          <span className={["action", "check"].includes(column.def) ? "" : "truncate-15"}>
                                            {row[column.def] || "N/A"}
                                          </span>
                                        </Tooltip>
                                      </>
                                    ) : column.type === "email" ? (
                                      <>
                                        <span className="tbl-icon material-icons-outlined col-red">mail</span>
                                        <Tooltip title={row[column.def] || "N/A"}>
                                          <span className={["action", "check"].includes(column.def) ? "" : "truncate-15"}>
                                            {row[column.def] || "N/A"}
                                          </span>
                                        </Tooltip>
                                      </>
                                    ) : column.type === "address" ? (
                                      <>
                                        <span className="tbl-icon material-icons-outlined col-blue">place</span>
                                        <Tooltip title={row[column.def] || "N/A"}>
                                          <span className={["action", "check"].includes(column.def) ? "" : "truncate-15"}>
                                            {row[column.def] || "N/A"}
                                          </span>
                                        </Tooltip>
                                      </>
                                    ) : column.def === "gender" ? (
                                      <span
                                        className={`badge ${
                                          row.gender === "M"
                                            ? "badge-solid-green"
                                            : row.gender === "F"
                                            ? "badge-solid-purple"
                                            : ""
                                        }`}
                                      >
                                        {row.gender || "N/A"}
                                      </span>
                                    ) : (
                                      <Tooltip title={row[column.def] || "N/A"}>
                                        <span className={["action", "check"].includes(column.def) ? "" : "truncate-15"}>
                                          {row[column.def] || "N/A"}
                                        </span>
                                      </Tooltip>
                                    )}
                                  </div>
                                </TableCell>
                              );
                            })}
                            <TableCell className="pr-0 d-flex">
                              <IconButton onClick={(e) => { e.stopPropagation(); editCall(row); }}>
                                <EditIcon sx={{color:'#7180f0'}}/>
                              </IconButton>
                              <IconButton onClick={(e) => { e.stopPropagation(); deleteItem(row); }}>
                                <DeleteIcon sx={{color:'red'}}/>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {(isLoading || loading) && (
                    <div className="tbl-spinner">
                      <CircularProgress color="primary" size={40} />
                    </div>
                  )}
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

 
    <Dialog open={openFilterModal} onClose={handleFilterModalClose} fullWidth>
      <DialogTitle>Column Filters</DialogTitle>
      <DialogContent>
        {columnDefinitions
          .filter((col) => col.type !== "check" && col.type !== "actionBtn")
          .map((col) => {
            if (col.def === "gender") {
              return (
         <DynamicSelect
  key={col.def}
  colDef={col}
  value={columnFilters[col.def]} // optional controlled value
  onChange={(val) => handleColumnFilterChange(col.def, val)}
/>
              );
            } 
            else if (col.def === "specialist_id") {
              return (
         <DynamicSelect
  key={col.def}
  colDef={col}
  value={columnFilters[col.def]} // optional controlled value
  onChange={(val) => handleColumnFilterChange(col.def, val)}
/>
              );
            } 
            else if (col.def === "appointment_status") {
              return (
           <DynamicSelect
  key={col.def}
  colDef={col}
  value={columnFilters[col.def]} // optional controlled value
  onChange={(val) => handleColumnFilterChange(col.def, val)}
/>
              );
            }
            
            else if (col.def === "date") {
              // 🔹 Date Picker for Date
              return (
                <DatePicker
                  key={col.def}
                  label={col.label}
                  value={columnFilters[col.def] || null}
                  onChange={(newValue) =>
                    handleColumnFilterChange(col.def, newValue)
                  }
                  slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                />
              );
            } else {
              // 🔹 Default TextField
              return (
                <TextField
                  key={col.def}
                  label={col.label}
                  value={columnFilters[col.def] || ""}
                  onChange={(e) =>
                    handleColumnFilterChange(col.def, e.target.value)
                  }
                  fullWidth
                  margin="normal"
                />
              );
            }
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFilterModalClose}>Cancel</Button>
        <Button onClick={applyColumnFilters} color="primary">
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>

      <BookAppointment
        open={openDialog}
        onClose={handleDialogClose}
        dialogTitle={dialogTitle}
        appointment={selectedAppointment}
        onSubmit={handleFormSubmit}
        variant="modal"   
      />
    </section>
  );
};

export default View;