import React, { useState, useRef } from 'react';
import {
  Stepper, Step, StepLabel, Button, TextField, Box, Typography,
  IconButton, CircularProgress, Card, CardHeader, CardContent
} from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import FaceIcon from '@mui/icons-material/Face';
import './StepperForm.css'; // Assuming a separate CSS file for custom styles

const StepperForm = ({
  title = 'Wizard',
  items = ['Form'],
  activeItem = 'Wizard',
}) => {
  // State for horizontal stepper
  const [activeStepH, setActiveStepH] = useState(0);
  const [formDataH, setFormDataH] = useState({
    firstName: '',
    lastName: '',
    address: ''
  });
  const [loadingH, setLoadingH] = useState(false);

  // State for vertical stepper
  const [activeStepV, setActiveStepV] = useState(0);
  const [formDataV, setFormDataV] = useState({
    firstName: '',
    lastName: '',
    address: ''
  });
  const [loadingV, setLoadingV] = useState(false);

  const steps = ['Fill out your name', 'Fill out your address', 'Done'];
  const searchInputRef = useRef(null);

  // Validation checks
  const isStepHValid = () => {
    if (activeStepH === 0) {
      return formDataH.firstName.trim() !== '' && formDataH.lastName.trim() !== '';
    }
    if (activeStepH === 1) {
      return formDataH.address.trim() !== '';
    }
    return true;
  };

  const isStepVValid = () => {
    if (activeStepV === 0) {
      return formDataV.firstName.trim() !== '' && formDataV.lastName.trim() !== '';
    }
    if (activeStepV === 1) {
      return formDataV.address.trim() !== '';
    }
    return true;
  };

  // Handle input changes
  const handleInputChangeH = (e) => {
    setFormDataH({ ...formDataH, [e.target.name]: e.target.value });
  };

  const handleInputChangeV = (e) => {
    setFormDataV({ ...formDataV, [e.target.name]: e.target.value });
  };

  // Stepper navigation
  const handleNextH = () => {
    setLoadingH(true);
    setTimeout(() => {
      setActiveStepH((prev) => prev + 1);
      setLoadingH(false);
    }, 500); // Simulate async operation
  };

  const handleBackH = () => {
    setActiveStepH((prev) => prev - 1);
  };

  const handleResetH = () => {
    setLoadingH(true);
    setTimeout(() => {
      setActiveStepH(0);
      setFormDataH({ firstName: '', lastName: '', address: '' });
      setLoadingH(false);
    }, 500); // Simulate async operation
  };

  const handleNextV = () => {
    setLoadingV(true);
    setTimeout(() => {
      setActiveStepV((prev) => prev + 1);
      setLoadingV(false);
    }, 500); // Simulate async operation
  };

  const handleBackV = () => {
    setActiveStepV((prev) => prev - 1);
  };

  const handleResetV = () => {
    setLoadingV(true);
    setTimeout(() => {
      setActiveStepV(0);
      setFormDataV({ firstName: '', lastName: '', address: '' });
      setLoadingV(false);
    }, 500); // Simulate async operation
  };

  // Simulate form submission
  const handleSubmit = (type) => {
    setLoadingH(type === 'horizontal');
    setLoadingV(type === 'vertical');
    setTimeout(() => {
      console.log(type === 'horizontal' ? formDataH : formDataV);
      setLoadingH(false);
      setLoadingV(false);
    }, 500); // Simulate async submission
  };

  return (
    <section className="content">
      <div className="content-block">
        <div className="block-header">
          <CustomBreadcrumb title={title} activeItem={activeItem} items={items} />
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Card className="card">
              <CardHeader className="materialTableHeader">
                <div className="left">
                  <ul className="header-buttons-left ms-0">
                    <li className="tbl-title">
                      <h2>Stepper Horizontal</h2>
                    </li>
                  </ul>
                </div>
                <div className="right">
                  <div className="right-side-btn d-flex">
                    <IconButton onClick={() => handleSubmit('horizontal')} title="Submit Form">
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton onClick={handleResetH} title="Reset">
                      <RefreshIcon />
                    </IconButton>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="body">
                <Stepper activeStep={activeStepH} orientation="horizontal" className="mb-4">
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box className="relative">
                  {activeStepH === 0 && (
                    <div>
                      <TextField
                        label="First Name"
                        name="firstName"
                        value={formDataH.firstName}
                        onChange={handleInputChangeH}
                        required
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                          endAdornment: <FaceIcon className="color-icon" />,
                        }}
                        className="example-full-width"
                      />
                      <TextField
                        label="Last Name"
                        name="lastName"
                        value={formDataH.lastName}
                        onChange={handleInputChangeH}
                        required
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                          endAdornment: <FaceIcon className="color-icon" />,
                        }}
                        className="example-full-width"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextH}
                        disabled={!isStepHValid()}
                        className="mt-4"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                  {activeStepH === 1 && (
                    <div>
                      <TextField
                        label="Address"
                        name="address"
                        value={formDataH.address}
                        onChange={handleInputChangeH}
                        required
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        placeholder="Ex. 1 Main St, New York, NY"
                        className="example-full-width"
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleBackH}
                        className="mt-4 msr-2"
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextH}
                        disabled={!isStepHValid()}
                        className="mt-4"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                  {activeStepH === 2 && (
                    <div>
                      <Typography variant="body1" className="mb-4">
                        You are now done.
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleBackH}
                        className="msr-2"
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleResetH}
                      >
                        Reset
                      </Button>
                    </div>
                  )}
                  {loadingH && (
                    <div className="tbl-spinner">
                      <CircularProgress color="primary" size={40} />
                    </div>
                  )}
                </Box>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Card className="card">
              <CardHeader className="materialTableHeader">
                <div className="left">
                  <ul className="header-buttons-left ms-0">
                    <li className="tbl-title">
                      <h2>Stepper Vertical</h2>
                    </li>
                  </ul>
                </div>
                <div className="right">
                  <div className="right-side-btn d-flex">
                    <IconButton onClick={() => handleSubmit('vertical')} title="Submit Form">
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton onClick={handleResetV} title="Reset">
                      <RefreshIcon />
                    </IconButton>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="body">
                <Stepper activeStep={activeStepV} orientation="vertical" className="mb-4">
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box className="relative">
                  {activeStepV === 0 && (
                    <div>
                      <TextField
                        label="First Name"
                        name="firstName"
                        value={formDataV.firstName}
                        onChange={handleInputChangeV}
                        required
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                          endAdornment: <FaceIcon className="color-icon" />,
                        }}
                        className="example-full-width"
                      />
                      <TextField
                        label="Last Name"
                        name="lastName"
                        value={formDataV.lastName}
                        onChange={handleInputChangeV}
                        required
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                          endAdornment: <FaceIcon className="color-icon" />,
                        }}
                        className="example-full-width"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextV}
                        disabled={!isStepVValid()}
                        className="mt-4"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                  {activeStepV === 1 && (
                    <div>
                      <TextField
                        label="Address"
                        name="address"
                        value={formDataV.address}
                        onChange={handleInputChangeV}
                        required
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        placeholder="Ex. 1 Main St, New York, NY"
                        className="example-full-width"
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleBackV}
                        className="mt-4 msr-2"
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextV}
                        disabled={!isStepVValid()}
                        className="mt-4"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                  {activeStepV === 2 && (
                    <div>
                      <Typography variant="body1" className="mb-4">
                        You are now done.
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleBackV}
                        className="msr-2"
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleResetV}
                      >
                        Reset
                      </Button>
                    </div>
                  )}
                  {loadingV && (
                    <div className="tbl-spinner">
                      <CircularProgress color="primary" size={40} />
                    </div>
                  )}
                </Box>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepperForm;