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

const Registration = ({
    open,
    onClose,
    dialogTitle,
    registration,
    onSaved,
    variant = "inline",
    createEndpoint = API_BASE_URL + "/registration",
    updateEndpoint = (id) => `${API_BASE_URL}/registration/${id}`,
    updateMethod = "put",
    extraHeaders = {},
}) => {
    const isEdit = Boolean(registration?.id);
    const effectiveTitle = useMemo(
        () => dialogTitle || (isEdit ? "Edit Registration" : "Book Registration"),
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
            uhid: "",
            panel: "",
            medical_plan: "",
            name: "",
            l_name: "",
            dob: "",
            patient_salutation_id: "",
            f_name: null,
            specialisation_id: "",
            specialist_id: "",
            f_mobile: "",
            refdoc: "",
            address: "",
            village: "",
            state: "",
            city: "",
            pincode: "",
            id_proff: "",
            std_idproof: "",
            empanelld: "",
            claimid: "",
            email: "",
            religion: "",
            officeno: "",
            occupation: "",
            material: "",
            pat_referred: "",
            patreferred_address: "",
            aadhar_number: "",
            pt_bloodgroup: "",
            admission_date: "",
            follow_date: "",
            reminder_date: "",
            token: "",
            timeslot: "",
            opdreg_no: "",
            ward: "",
            relname1: "",
            relrelation: "",
            reladd1: "",
            relmobile: "",
            relname2: "",
            relrelation2: "",
            reladd2: "",
            relmobile2: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (registration) {
            reset({
                ...registration,
                time_of_visit: registration.time_of_visit
                    ? dayjs(registration.time_of_visit, "HH:mm")
                    : null,
            });
        } else {
            reset();
        }
    }, [registration, reset]);

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
        const url = isEdit ? updateEndpoint(registration.id) : createEndpoint;
        return axios({ method, url, data: payload, headers });
    };

    const onSubmitInternal = async (values) => {
        const payload = {
            ...values,
            id: registration?.id,
            time_of_visit: values.time_of_visit
                ? dayjs(values.time_of_visit).format("HH:mm")
                : null,
        };

        try {
            setSaving(true);
            const res = await apiSave(payload);
            setSnack({
                open: true,
                message: isEdit ? "Registration updated" : "Registration created",
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
                <div className="col-md-8 border p-2">
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <TextField
                                fullWidth
                                label="UHID"
                                size="small"
                                {...register("uhid", { required: "UHID is required" })}
                                error={!!errors.uhid}
                                helperText={errors.uhid?.message}
                            />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Panel/Company" size="small" {...register("panel")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Medical Plan" size="small" {...register("medical_plan")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="UIDAI/Aadhaar" size="small" {...register("aadhar_number")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Blood Group" size="small" {...register("pt_bloodgroup")} />
                        </div>

                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Patient Name" size="small" {...register("name")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Surname Name" size="small" {...register("l_name")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Age in(DD/MM/YY)" size="small" {...register("dob")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth type="date" size="small" {...register("date_brith")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <FormControl fullWidth>
                                <InputLabel>Salutation</InputLabel>
                                <Select
                                    defaultValue=""
                                    size="small" {...register("patient_salutation_id", { required: "Required" })}
                                >
                                    <MenuItem value="1">Mr.</MenuItem>
                                    <MenuItem value="2">Mrs.</MenuItem>
                                    <MenuItem value="3">Ms.</MenuItem>
                                    <MenuItem value="4">Dr.</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Relative Name" size="small" {...register("f_name")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Specialization" size="small" {...register("specialisation_id")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Specialist/Doctor" size="small" {...register("specialist_id")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField
                                fullWidth
                                label="Patient Mobiles" size="small"
                                {...register("f_mobile", { required: "Patient Mobile required" })}
                                error={!!errors.f_mobile}
                                helperText={errors.f_mobile?.message}
                            />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Reffered By" size="small" {...register("refdoc")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Address" size="small" {...register("address")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Country" size="small" {...register("village")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="State" size="small" {...register("state")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="City" size="small" {...register("city")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Pin/Zip" size="small" {...register("pincode")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <FormControl fullWidth>
                                <InputLabel>ID Proof Type</InputLabel>
                                <Select
                                    defaultValue=""
                                    size="small" {...register("id_proff", { required: "Required" })}
                                >
                                    <MenuItem value="1">Adhaar Card</MenuItem>
                                    <MenuItem value="2">PAN Card</MenuItem>
                                    <MenuItem value="3">Parent ID</MenuItem>
                                    <MenuItem value="4">Passport</MenuItem>
                                    <MenuItem value="5">Voter ID</MenuItem>
                                    <MenuItem value="6">Postal ID</MenuItem>
                                    <MenuItem value="7">Government-issued Health Cards</MenuItem>
                                    <MenuItem value="8">Employee ID</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="ID Proof No" size="small" {...register("std_idproof")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="HealthCard/Policy No." size="small" {...register("empanelld")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="TID/Tra.ID" size="small" {...register("claimid")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Email Id" size="small" {...register("email")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Religion" size="small" {...register("religion")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Education" size="small" {...register("officeno")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Occupation" size="small" {...register("occupation")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Marital status" size="small" {...register("material")} />
                        </div>
                        <div className="col-md-2 mb-2">
                            <FormControl fullWidth>
                                <InputLabel>Information Sources</InputLabel>
                                <Select
                                    defaultValue=""
                                    size="small" {...register("pat_referred", { required: "Required" })}
                                >
                                    <MenuItem value="1">Old Patient</MenuItem>
                                    <MenuItem value="2">Website</MenuItem>
                                    <MenuItem value="3">Email</MenuItem>
                                    <MenuItem value="4">WhatsApp</MenuItem>
                                    <MenuItem value="5">Facebook</MenuItem>
                                    <MenuItem value="6">Newspaper</MenuItem>
                                    <MenuItem value="7">Television</MenuItem>
                                    <MenuItem value="8">Radio</MenuItem>
                                    <MenuItem value="9">Mouth Publicity</MenuItem>
                                    <MenuItem value="10">Hoarding</MenuItem>
                                    <MenuItem value="11">Refferal</MenuItem>
                                    <MenuItem value="12">Other</MenuItem>
                                    <MenuItem value="13">Camp</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-2 mb-2">
                            <TextField fullWidth label="Location" size="small" {...register("patreferred_address")} />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 border p-2 ml-2">
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <InputLabel>DoA</InputLabel><TextField fullWidth type="date" size="small" {...register("admission_date")} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <InputLabel>Follow-Ups Date </InputLabel><TextField fullWidth type="date" size="small" {...register("follow_date")} />
                        </div>
                        <div className="col-md-6 mb-2">
                            <InputLabel>Reminder Date</InputLabel><TextField fullWidth type="date" size="small" {...register("reminder_date")} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-2">
                            <InputLabel>Token No.</InputLabel><TextField fullWidth label="Token No." size="small" {...register("token")} />
                        </div>
                        <div className="col-md-3 mb-2">
                            <InputLabel>Time Slot</InputLabel><TextField fullWidth label="Time Slot" size="small" {...register("timeslot")} />
                        </div>
                        <div className="col-md-3 mb-2">
                            <InputLabel>OPD No.</InputLabel><TextField fullWidth label="OPD No." size="small" {...register("opdreg_no")} />
                        </div>
                        <div className="col-md-3 mb-2">
                            <InputLabel>Ward No.</InputLabel><TextField fullWidth label="Ward No." size="small" {...register("ward")} />
                        </div>
                    </div>
                    <div className="row">
                        <Typography
                            variant="h5"
                            sx={{ fontSize: 15, fontWeight: "bold" }}
                        >
                            Patient Attendant Entry
                        </Typography>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-2">
                            <InputLabel>Attendent-1</InputLabel><TextField fullWidth label="Attendent-1 Address" size="small" {...register("relname1")} />
                        </div>
                        <div className="col-md-3 mb-2">
                            <InputLabel>Relation</InputLabel><TextField fullWidth label="Relation" size="small" {...register("relrelation")} />
                        </div>
                        <div className="col-md-3 mb-2">
                            <InputLabel>Address</InputLabel><TextField fullWidth label="Address" size="small" {...register("reladd1")} />
                        </div>
                        <div className="col-md-3 mb-2">
                            <InputLabel>Mobile</InputLabel><TextField fullWidth label="Attendent-1 Mobile" size="small" {...register("relmobile")} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-2">
                            <InputLabel>Attendent-2</InputLabel><TextField fullWidth label="Attendant-2 Address" size="small" {...register("relname2")} />
                        </div>
                        <div className="col-md-3 mb-2">
                            <InputLabel>Relation</InputLabel><TextField fullWidth label="Relation" size="small" {...register("relrelation2")} />
                        </div>
                        <div className="col-md-3 mb-2">
                            <InputLabel>Address</InputLabel><TextField fullWidth label="Address" size="small" {...register("reladd2")} />
                        </div>
                        <div className="col-md-3 mb-2">
                            <InputLabel>Mobile</InputLabel><TextField fullWidth label="Attendent-2 Mobile" size="small" {...register("relmobile2")} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Table Section */}
            <div className="mt-4">
                <Typography variant="h6" gutterBottom>
                    Services / Items
                </Typography>
                <table className="table table-bordered table-striped mr-3">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Item/Service Name</th>
                            <th>Item Code</th>
                            <th>Qnty</th>
                            <th>Amt</th>
                            <th>Dis.%</th>
                            <th>Dis.Amt</th>
                            <th>Add-On</th>
                            <th>Tax</th>
                            <th>Tax.Amt</th>
                            <th>Net Amount</th>
                            <th>Ref Doctor</th>
                            <th>Batch Code</th>
                            <th>Exp. Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><TextField size="small" type="date" fullWidth {...register("date_added")} /></td>
                            <td><TextField size="small" fullWidth label="Category" {...register("catagory")} /></td>
                            <td><TextField size="small" fullWidth label="Item/Service Name" {...register("name_1")} /></td>
                            <td><TextField size="small" fullWidth label="Item Code" {...register("itemcode")} /></td>
                            <td><TextField size="small" fullWidth label="Qnty" {...register("qty")} /></td>
                            <td><TextField size="small" fullWidth label="Amt" {...register("amount")} /></td>
                            <td><TextField size="small" fullWidth label="Dis.%" {...register("discount_per")} /></td>
                            <td><TextField size="small" fullWidth label="Dis.Amt" {...register("discount")} /></td>
                            <td><TextField size="small" fullWidth label="Add-On" {...register("extraamt1")} /></td>
                            <td><TextField size="small" fullWidth label="Tax" {...register("textrate1")} /></td>
                            <td><TextField size="small" fullWidth label="Tax.Amt" {...register("igst1")} /></td>
                            <td><TextField size="small" fullWidth label="Net Amount" {...register("net_amt")} /></td>
                            <td><TextField size="small" fullWidth label="Ref Doctor" {...register("ref_id")} /></td>
                            <td><TextField size="small" fullWidth label="Batch Code" {...register("batchcode")} /></td>
                            <td><TextField size="small" type="date" fullWidth {...register("expiry")} /></td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-bordered table-striped mr-3">
                    <thead>
                        <tr>
                            <th>Remark</th>
                            <th>Dis.%</th>
                            <th>Dis.In Amt.</th>
                            <th>Paid Amount</th>
                            <th>PayMode</th>
                            <th>Tran.Remarks</th>
                            <th>TranID</th>
                            <th>PayMode 1</th>
                            <th>Paymode 1</th>
                            <th>PayMode 2</th>
                            <th>PayMode 2</th>
                            <th>PayMode 3</th>
                            <th>PayMode 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><TextField size="small" fullWidth label="Remark" {...register("tarnid_1")} /></td>
                            <td><TextField size="small" fullWidth label="Dis %" {...register("disintotal0")} /></td>
                            <td><TextField size="small" fullWidth label="Dis. In Amt." {...register("disintotal")} /></td>
                            <td><TextField size="small" fullWidth label="Paid Amount" {...register("paid_amount")} /></td>
                            <td><TextField size="small" fullWidth label="PayMode" {...register("pay_status")} /></td>
                            <td><TextField size="small" fullWidth label="Tran.Remarks" {...register("remark")} /></td>
                            <td><TextField size="small" fullWidth label="TranID" {...register("tran_id")} /></td>
                            <td><TextField size="small" fullWidth label="PayMode 1" {...register("pay_status_2")} /></td>
                            <td><TextField size="small" fullWidth label="Paymode 1" {...register("paid_amount_1")} /></td>
                            <td><TextField size="small" fullWidth label="PayMode 2" {...register("pay_status_3")} /></td>
                            <td><TextField size="small" fullWidth label="PayMode 2" {...register("paid_amount_2")} /></td>
                            <td><TextField size="small" fullWidth label="PayMode 3" {...register("pay_status_4")} /></td>
                            <td><TextField size="small" fullWidth label="PayMode 3" {...register("paid_amount_3")} /></td>
                        </tr>
                    </tbody>
                </table>
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
                        title={"Registration"}
                        activeItem={isEdit ? "Edit" : "Book"}
                        items={"Registration"}
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

export default Registration;
