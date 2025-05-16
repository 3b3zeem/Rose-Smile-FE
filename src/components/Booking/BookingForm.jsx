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
// import useBookingSubmit from "../../hooks/Bookings/useBookingSubmit";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../../layouts/Loader";
import useBookingSubmit from "../../hooks/Bookings/useBookingSubmit";
import { useAuthContext } from "../../context/Auth/AuthContext";

export default function BookingForm({
  serviceData,
  sectionData,
  isSectionBooking,
}) {
  const { user } = useAuthContext();
  const { services: allServices } = useServiceTitles();
  const { sections } = useSectionTitles();
  const {
    submitBooking,
    defaultSheet,
    loadingSubmit: submitLoading,
    errorSubmit: submitError,
    success: submitSuccess,
  } = useBookingSubmit();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    service: "",
    section: "",
    spreadsheetId: "",
  });

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        phone: user.phone || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (defaultSheet?.sheet_id) {
      setFormData((prev) => ({
        ...prev,
        spreadsheetId: defaultSheet.sheet_id,
      }));
    }
  }, [defaultSheet]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      service: serviceData?.id || "",
      section: sectionData?.id || "",
    }));
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

    const { name, phone, city, service, section, spreadsheetId } = formData;
    if (!name || !phone || !city || !service || !section || !spreadsheetId) {
      toast.error("من فضلك املأ جميع الحقول المطلوبة", {
        position: "top-right",
        style: {
          fontFamily: "Arial, sans-serif",
          direction: "rtl",
          textAlign: "right",
        },
      });
      return;
    }

    await submitBooking(formData);
    if (!submitError) {
      setFormData({
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        phone: user.phone || "",
        city: "",
        service: serviceData?.id || "",
        section: sectionData?.id || "",
        spreadsheetId: defaultSheet?.sheet_id || "",
      });
    }
  };

  const isServiceDisabled = !isSectionBooking;
  const isSectionDisabled = true;

  const sectionServices = isSectionBooking ? sectionData?.services || [] : [];

  return (
    <>
      <Toaster />
      <div className="bg-white rounded-2xl p-8">
        <span className="text-2xl text-gray-600">احجز موعدك</span>
        <form onSubmit={handleSubmit} className="p-8">
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
            type="tel"
            inputProps={{ inputMode: "numeric" }}
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setFormData((prev) => ({ ...prev, phone: value }));
              }
            }}
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
            disabled={isServiceDisabled || submitLoading}
          >
            <InputLabel id="service-label">الخدمة</InputLabel>
            <Select
              labelId="service-label"
              name="service"
              value={formData.service}
              onChange={handleChange}
            >
              {isSectionBooking ? (
                sectionServices.length > 0 ? (
                  sectionServices.map((service) => (
                    <MenuItem key={service._id} value={service._id}>
                      {service.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">لا توجد خدمات متاحة</MenuItem>
                )
              ) : (
                <MenuItem value={formData.service}>
                  {serviceData?.title || <Loader />}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: "15px" }}
            disabled={isSectionDisabled || submitLoading}
          >
            <InputLabel id="section-label">القسم</InputLabel>
            <Select
              labelId="section-label"
              name="section"
              value={formData.section}
              onChange={handleChange}
            >
              {sections?.length > 0 ? (
                sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    {section.title}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={formData.section}>
                  {sectionData?.title || <Loader />}
                </MenuItem>
              )}
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
                minWidth: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#253276",
                },
              }}
              size="large"
              disabled={submitLoading}
            >
              {submitLoading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "احجز ميعادك"
              )}
            </Button>
          </CardActions>
        </form>
      </div>
    </>
  );
}
