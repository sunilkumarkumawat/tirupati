import React, { useState, useRef } from 'react';
import {
  Stepper, Step, StepLabel, Button, TextField, Box, Typography,
  IconButton, CircularProgress, Card, CardHeader, CardContent
} from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import FaceIcon from '@mui/icons-material/Face';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appointmentSchema } from '../components/ValidationSchemas';
import CustomBreadcrumb from '../components/CustomBreadcrumb';

const Dashboard = ({
  title = 'Appointment',
  items = ['Appointment View'],
  activeItem = 'View',
}) => {
  const [activeStepH, setActiveStepH] = useState(0);
  const [loadingH, setLoadingH] = useState(false);
  const steps = ['Fill out your name', 'Fill out your address', 'Done'];
  const searchInputRef = useRef(null);

  // Initialize react-hook-form with Yup validation
  const { control, handleSubmit: formSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(appointmentSchema),
    mode: 'onChange', // Validate on change for real-time feedback
    defaultValues: {
      name: '',
      lastName: '',
      address: ''
    }
  });

  // Stepper navigation
  const handleNextH = (data) => {
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
      reset({ name: '', lastName: '', address: '' });
      setLoadingH(false);
    }, 500); // Simulate async operation
  };

  // Form submission handler
  const onSubmit = (data) => {
    setLoadingH(true);
    setTimeout(() => {
      console.log('Form submitted:', data);
      setLoadingH(false);
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
                    <IconButton onClick={formSubmit(onSubmit)} title="Submit Form">
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
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="First Name"
                            required
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                              endAdornment: <FaceIcon className="color-icon" />,
                            }}
                            className="example-full-width"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                          />
                        )}
                      />
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Last Name"

                            fullWidth
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                              endAdornment: <FaceIcon className="color-icon" />,
                            }}
                            className="example-full-width"
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                          />
                        )}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={formSubmit(handleNextH)}
                        disabled={!isValid}
                        className="mt-4"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                  {activeStepH === 1 && (
                    <div>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Address"
                            required
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            placeholder="Ex. 1 Main St, New York, NY"
                            className="example-full-width"
                            error={!!errors.address}
                            helperText={errors.address?.message}
                          />
                        )}
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
                        onClick={formSubmit(handleNextH)}
                        disabled={!isValid}
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
      </div>
    </section>
  );
};

export default Dashboard;