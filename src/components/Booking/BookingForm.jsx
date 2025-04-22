import {
  Button,
  CardActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSectionTitles } from "../../hooks/Sections/UseSections";
import { useServiceTitles } from "../../hooks/Services/useServices";
import useBookingSubmit from "../../hooks/Bookings/useBookingSubmit";
import { Toaster, toast } from "react-hot-toast";

export default function BookingForm({ serviceData, sectionData }) {
  const { services, loading: servicesLoading } = useServiceTitles();
  const { sections, loading: sectionsLoading } = useSectionTitles();
  const {
    submitBooking,
    loading: submitLoading,
    error: submitError,
    success: submitSuccess,
  } = useBookingSubmit();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    service: "",
    section: "",
  });

  useEffect(() => {
    if (serviceData) {
      setFormData((prev) => ({
        ...prev,
        service: serviceData._id || "",
        section: serviceData.sectionId?._id || "",
      }));
    } else if (sectionData) {
      setFormData((prev) => ({
        ...prev,
        section: sectionData._id || "",
        service: "",
      }));
    }
  }, [serviceData, sectionData]);

  useEffect(() => {
    if (submitSuccess) {
      toast.success(submitSuccess, {
        position: "top-right",
        style: {
          fontFamily: "Arial, sans-serif",
          direction: "rtl",
          textAlign: "right",
        },
      });
    }
    if (submitError) {
      toast.error(submitError, {
        position: "top-right",
        style: {
          fontFamily: "Arial, sans-serif",
          direction: "rtl",
          textAlign: "right",
        },
      });
    }
  }, [submitSuccess, submitError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { section, ...dataToSubmit } = formData;
    await submitBooking(dataToSubmit);
    if (!submitError) {
      setFormData({
        name: "",
        phone: "",
        city: "",
        service: serviceData?._id || "",
        section: serviceData?.sectionId?._id || sectionData?._id || "",
      });
    }
  };

  const isServiceDisabled = !!serviceData?._id || servicesLoading || submitLoading;
  const isSectionDisabled =
    !!serviceData?.sectionId?._id ||
    !!sectionData?._id ||
    sectionsLoading ||
    submitLoading;

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        {submitSuccess && (
          <Typography
            color="success.main"
            sx={{ marginBottom: "15px", textAlign: "right" }}
          >
            {submitSuccess}
          </Typography>
        )}
        {submitError && (
          <Typography
            color="error"
            sx={{ marginBottom: "15px", textAlign: "right" }}
          >
            {submitError}
          </Typography>
        )}
        <TextField
          fullWidth
          label="الاسم"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ marginBottom: "15px", direction: "rtl" }}
          required
          disabled={submitLoading}
        />
        <TextField
          fullWidth
          label="رقم الهاتف"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          sx={{ marginBottom: "15px", direction: "rtl" }}
          required
          disabled={submitLoading}
        />
        <TextField
          fullWidth
          label="المدينة"
          name="city"
          value={formData.city}
          onChange={handleChange}
          sx={{ marginBottom: "15px", direction: "rtl" }}
          required
          disabled={submitLoading}
        />
        <FormControl
          fullWidth
          sx={{ marginBottom: "15px" }}
          disabled={servicesLoading || isServiceDisabled || submitLoading}
        >
          <InputLabel id="service-label">الخدمة</InputLabel>
          <Select
            labelId="service-label"
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            {services?.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                {service.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{ marginBottom: "15px" }}
          disabled={sectionsLoading || isSectionDisabled || submitLoading}
        >
          <InputLabel id="section-label">القسم</InputLabel>
          <Select
            labelId="section-label"
            name="section"
            value={formData.section}
            onChange={handleChange}
          >
            {sections?.map((section) => (
              <MenuItem key={section.id} value={section.id}>
                {section.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "15px",
          }}
        >
          <Button
            type="submit"
            sx={{
              backgroundColor: "#314DDF",
              color: "white",
              padding: "10px",
              fontSize: "20px",
              "&:hover": {
                backgroundColor: "#253276",
              },
            }}
            size="large"
            disabled={submitLoading}
          >
            {submitLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "احجز ميعادك"
            )}
          </Button>
        </CardActions>
      </form>
    </>
  );
}
