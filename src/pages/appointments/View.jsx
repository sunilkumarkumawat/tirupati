import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
Tooltip,  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, 
  IconButton, Menu, MenuItem, Checkbox, CircularProgress 
} from '@mui/material';
import { 
  Menu as MenuIcon, Search as SearchIcon, Delete as DeleteIcon, 
  AddCircleOutline as AddCircleOutlineIcon, Refresh as RefreshIcon, 
  FileDownload as FileDownloadIcon, EditSquare as EditIcon, AddBox as AddBoxIcon, 
  Create as CreateIcon, Refresh as RefreshMenuIcon, NoEncryption as NoEncryptionIcon, 
  ListAlt as ListAltIcon, MailOutline as MailOutlineIcon, Call as CallIcon, Chat as ChatIcon 
} from '@mui/icons-material';
import userImg from "../../assets/images/user/admin.jpg";
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import BookAppointment from './BookAppointment';

// ✅ Stable default dataSource (outside component)
const defaultDataSource = {
  data: [
    {
      id: 1,
      name: 'Prashant Johnson',
      img: '/assets/images/user.jpg',
      doctor: 'Dr. Jay Soni',
      gender: 'male',
      date: '2024-11-14',
      time: '09:45',
      mobile: '2345678901',
      email: 'alice.j@email.com',
      appointmentStatus: 'Scheduled',
      visitType: 'New Patient',
    },
    {
      id: 2,
      name: 'Alice Johnson',
      img: '/assets/images/user.jpg',
      doctor: 'Dr. Jay Soni',
      gender: 'female',
      date: '2024-12-13',
      time: '09:45',
      mobile: '2345678901',
      email: 'alice.j@email.com',
      appointmentStatus: 'Scheduled',
      visitType: 'New Patient',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      img: '/assets/images/user.jpg',
      doctor: 'Dr. Jay Soni',
      gender: 'female',
      date: '2025-01-15',
      time: '09:45',
      mobile: '2345678901',
      email: 'alice.j@email.com',
      appointmentStatus: 'Scheduled',
      visitType: 'New Patient',
    },
  ],
  filteredData: []
};

const View = ({
  title = 'Appointment',
  items = ['Appointments'],
  activeItem = 'View',
  columnDefinitions = [
    { def: 'select', type: 'check' },
    { def: 'name', label: 'Name', type: 'text' },
    { def: 'doctor', label: 'Doctor', type: 'text' },
    { def: 'gender', label: 'Gender', type: 'text' },
    { def: 'date', label: 'Date', type: 'date' },
    { def: 'time', label: 'Time', type: 'time' },
    { def: 'mobile', label: 'Mobile', type: 'phone' },
    { def: 'email', label: 'Email', type: 'email' },
    { def: 'appointmentStatus', label: 'Appointment Status', type: 'text' },
    { def: 'visitType', label: 'Visit Type', type: 'text' },
    { def: 'actions', type: 'actionBtn' },
  ],
  dataSource = defaultDataSource,
  isLoading = false,
}) => {
  const [selection, setSelection] = useState(new Set());
  const [filter, setFilter] = useState('');
  const [anchorElContext, setAnchorElContext] = useState(null);
  const [contextMenuItem, setContextMenuItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dialogTitle, setDialogTitle] = useState('Add Appointment');
  const [appointments, setAppointments] = useState(dataSource.data || []);
  const searchInputRef = useRef(null);

  // ✅ Fix: only run when dataSource.data changes
  useEffect(() => {
    setAppointments(dataSource?.data || []);
  }, [dataSource?.data]);

  const applyFilter = (event) => setFilter(event.target.value.toLowerCase());

  const masterToggle = () => {
    const newSelection = new Set(selection);
    if (isAllSelected()) {
      newSelection.clear();
    } else {
      appointments.forEach(row => newSelection.add(row));
    }
    setSelection(newSelection);
  };

  const isAllSelected = () => selection.size === appointments.length;

  const toggleRow = (row) => {
    const newSelection = new Set(selection);
    if (newSelection.has(row)) {
      newSelection.delete(row);
    } else {
      newSelection.add(row);
    }
    setSelection(newSelection);
  };

  const removeSelectedRows = () => {
    const newAppointments = appointments.filter(row => !selection.has(row));
    setAppointments(newAppointments);
    setSelection(new Set());
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
    setAppointments(dataSource?.data || []);
    setSelection(new Set());
    setFilter('');
  };

  const exportExcel = () => {
    console.log('Export Excel');
  };

  const deleteItem = (row) => {
    const newAppointments = appointments.filter(item => item.id !== row.id);
    setAppointments(newAppointments);
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

  const handleFormSubmit = (data) => {
    if (selectedAppointment) {
      const updatedAppointments = appointments.map(item =>
        item.id === selectedAppointment.id ? { ...item, ...data, id: item.id } : item
      );
      setAppointments(updatedAppointments);
    } else {
      const newAppointment = {
        ...data,
        id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
        img: '/assets/images/user.jpg'
      };
      setAppointments([...appointments, newAppointment]);
    }
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  // ✅ useMemo for filtering (performance)
  const filteredData = useMemo(() => {
    return appointments.filter(row =>
      Object.values(row).some(value =>
        value && value.toString().toLowerCase().includes(filter)
      )
    );
  }, [appointments, filter]);

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
                  </div>
                </div>
              </div>
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
                            if (column.type === 'check' || column.type === 'actionBtn') return null;
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
                        {filteredData.map((row, index) => (
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
                              if (column.type === 'check' || column.type === 'actionBtn') return null;
                              return (
                                  

<TableCell
  key={column.def}
  className={column.def === "name" ? "truncate-text" : ""}
  onClick={(e) => { e.stopPropagation(); editCall(row); }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
    {column.def === "name" ? (
      <>
        {userImg && <img src={userImg} className="table-img" alt="image" />}
        <Tooltip title={row.name || "N/A"}>
          <span className={["action", "check"].includes(column.def) ? "" : "truncate-15"}>
            {row.name
              ? row.name.slice(0, 15) + (row.name.length > 15 ? "..." : "")
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
          row.gender === "male"
            ? "badge-solid-green"
            : row.gender === "female"
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
                                <DeleteIcon  sx={{color:'red'}}/>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {isLoading && (
                    <div className="tbl-spinner">
                      <CircularProgress color="primary" size={40} />
                    </div>
                  )}
                  <div>Pagination: {filteredData.length} items</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
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
