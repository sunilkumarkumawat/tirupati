import React, { useEffect, useMemo, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const BookAppointment = ({
  open,
  onClose,
  dialogTitle,
  appointment,
  onSaved,
  variant = "inline",
  createEndpoint = API_BASE_URL + "/appointments",
  updateEndpoint = (id) => `${API_BASE_URL}/appointments/${id}`,
  updateMethod = "put",
  extraHeaders = {},
}) => {
  const isEdit = Boolean(appointment?.id);
  const effectiveTitle = useMemo(
    () => dialogTitle || (isEdit ? "Edit Appointment" : "Book Appointment"),
    [dialogTitle, isEdit]
  );

  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const { token } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      patient_name: "",
      m_name: "",
      l_name: "",
      phone_code: "",
      patient_mobile: "",
      patient_mobile2: "",
      patient_salutation_id: "",
      time_of_visit: null,
      specialisation: "",
      specialist_id: "",
      specialist_id_2: "",
      refdoctor_id: "",
      appointment_status: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (appointment) {
      reset({
        ...appointment,
        time_of_visit: appointment.time_of_visit
          ? dayjs(appointment.time_of_visit, "HH:mm")
          : null,
      });
    } else {
      reset();
    }
  }, [appointment, reset]);

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const apiSave = async (payload) => {
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
      ...extraHeaders,
    };
    const method = isEdit ? updateMethod.toLowerCase() : "post";
    const url = isEdit ? updateEndpoint(appointment.id) : createEndpoint;
    return axios({ method, url, data: payload, headers });
  };

  const onSubmitInternal = async (values) => {
    const payload = {
      ...values,
      id: appointment?.id,
      time_of_visit: values.time_of_visit
        ? dayjs(values.time_of_visit).format("HH:mm")
        : null,
    };

    try {
      setSaving(true);
      const res = await apiSave(payload);
      setSnack({
        open: true,
        message: isEdit ? "Appointment updated" : "Appointment created",
        severity: "success",
      });
      onSaved?.(res?.data ?? payload);
      handleClose();
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Something went wrong";
      setSnack({ open: true, message: msg, severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmitInternal)} className='p-4'>
      <div className="row ">
        {/* Patient Name */}
        <div className="col-md-4 mb-2">
          <TextField
            fullWidth
            label="First Name"
            {...register("patient_name", { required: "First name is required" })}
            error={!!errors.patient_name}
            helperText={errors.patient_name?.message}
          />
        </div>
        <div className="col-md-4 mb-2">
          <TextField fullWidth label="Middle Name" {...register("m_name")} />
        </div>
        <div className="col-md-4 mb-2">
          <TextField fullWidth label="Last Name" {...register("l_name")} />
        </div>
      </div>

      <div className="row">
        {/* Phone Code + Mobiles */}
        <div className="col-md-4 mb-2">
          <TextField fullWidth label="Phone Code" {...register("phone_code")} />
        </div>
        <div className="col-md-4 mb-2">
          <TextField
            fullWidth
            label="Mobile"
            {...register("patient_mobile", { required: "Mobile required" })}
            error={!!errors.patient_mobile}
            helperText={errors.patient_mobile?.message}
          />
        </div>
        <div className="col-md-4 mb-2">
          <TextField fullWidth label="Alternate Mobile" {...register("patient_mobile2")} />
        </div>
      </div>

      {/* Salutation */}
      <div className="row">
        <div className="col-md-6 mb-2">
          <FormControl fullWidth>
            <InputLabel>Salutation</InputLabel>
            <Select
              defaultValue=""
              {...register("patient_salutation_id", { required: "Required" })}
            >
              <MenuItem value="1">Mr.</MenuItem>
              <MenuItem value="2">Mrs.</MenuItem>
              <MenuItem value="3">Ms.</MenuItem>
              <MenuItem value="4">Dr.</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Time of Visit */}
        <div className="col-md-6 mb-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="time_of_visit"
              control={control}
              rules={{ required: "Please select time" }}
              render={({ field }) => (
                <TimePicker
                  label="Time of Visit"
                  {...field}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.time_of_visit,
                      helperText: errors.time_of_visit?.message,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>

      {/* Specialisation + Doctors */}
      <div className="row">
        <div className="col-md-4 mb-2">
          <TextField
            fullWidth
            label="Specialisation"
            {...register("specialisation")}
          />
        </div>
        <div className="col-md-4 mb-2">
          <TextField
            fullWidth
            label="Specialist 1"
            {...register("specialist_id")}
          />
        </div>
        <div className="col-md-4 mb-2">
          <TextField
            fullWidth
            label="Specialist 2"
            {...register("specialist_id_2")}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-2">
          <TextField fullWidth label="Referred Doctor" {...register("refdoctor_id")} />
        </div>
        <div className="col-md-6 mb-2">
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              defaultValue=""
              {...register("appointment_status", { required: "Status required" })}
            >
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-2 mt-3">
        <Button
          variant="contained"
          type="submit"
          disabled={!isValid || saving}
          startIcon={saving ? <CircularProgress size={18} /> : null}
        >
          {isEdit ? "Update" : "Save"}
        </Button>
        <Button variant="outlined" onClick={handleClose} disabled={saving}>
          Cancel
        </Button>
      </div>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </form>
  );

  if (variant === "modal") {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <div className="modalHeader d-flex justify-content-between align-items-center">
          <DialogTitle>{effectiveTitle}</DialogTitle>
          <IconButton onClick={handleClose} disabled={saving}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>{formContent}</DialogContent>
      </Dialog>
    );
  }

  return (
    <section className="content">
      <div className="content-block">
        <div className="block-header">
          <CustomBreadcrumb
            title={"Appointment"}
            activeItem={isEdit ? "Edit" : "Book"}
            items={"Appointment"}
          />
        </div>
        <Paper elevation={3} className="p-3">
          <Typography variant="h6">{effectiveTitle}</Typography>
          {formContent}
        </Paper>
      </div>
    </section>
  );
};

export default BookAppointment;
