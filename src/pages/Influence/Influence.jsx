import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  fetchServicesBySection,
  postForm,
  useSheet,
} from "../../hooks/Sheet/useSheet";
import { useSectionTitles } from "../../hooks/Sections/UseSections";
import { useServiceTitles } from "../../hooks/Services/useServices";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Loader from "./../../layouts/Loader";
import { useAuthContext } from "../../context/Auth/AuthContext";

import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

const Influence = () => {
  const { name } = useParams();
  const { user } = useAuthContext();
  const {
    data: sheet,
    isLoading: isSheetLoading,
    isError: isSheetError,
  } = useSheet(name);
  const { sections } = useSectionTitles();
  const { services: allServices, isLoading: isAllServicesLoading } =
    useServiceTitles();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    email: "",
    service: "",
    section: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        phone: user.phone || "",
      }));
    }
  }, [user]);

  // * Fetch services based on selected section
  const { data: filteredServices, isLoading: isServicesLoading } = useQuery({
    queryKey: ["services", formData.section],
    queryFn: () => fetchServicesBySection(formData.section),
    enabled: !!formData.section,
    onError: (error) => {
      toast.error(error.message || "حدث خطأ أثناء جلب الخدمات", {
        position: "top-right",
        style: {
          fontFamily: "Arial, sans-serif",
          direction: "rtl",
          textAlign: "right",
        },
      });
    },
  });

  const displayedServices = useMemo(
    () => (formData.section ? filteredServices || [] : allServices || []),
    [formData.section, filteredServices, allServices]
  );

  useEffect(() => {
    if (
      formData.service &&
      !displayedServices.some(
        (service) =>
          String(service._id || service.id) === String(formData.service)
      )
    ) {
      setFormData((prev) => ({ ...prev, service: "" }));
    }
  }, [displayedServices, formData.service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "service" ? String(value) : value,
      ...(name === "section" ? { service: "" } : {}),
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\+?\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, phone: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, city, section } = formData;
    if (!name || !phone || !city || !section) {
      toast.error("من فضلك املأ جميع الحقول المطلوبة.", {
        position: "top-right",
        style: {
          fontFamily: "Arial, sans-serif",
          direction: "rtl",
          textAlign: "right",
        },
      });
      return;
    }
    setLoading(true);
    try {
      await postForm({
        name,
        phone,
        city,
        service: formData.service || undefined,
        section,
        spreadsheetId: sheet?.sheet_id,
      });
      setFormData({
        name: "",
        phone: "",
        city: "",
        email: "",
        service: "",
        section: "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "حدث خطأ أثناء إرسال البيانات",
        {
          position: "top-right",
          style: {
            fontFamily: "Arial, sans-serif",
            direction: "rtl",
            textAlign: "right",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  if (isSheetLoading || isAllServicesLoading) {
    return <Loader />;
  }

  if (isSheetError || !sheet) {
    return (
      <Typography color="error" align="center" mt={5}>
        حدث خطأ أثناء تحميل البيانات
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" dir="rtl" sx={{ minHeight: "100vh", py: 8 }}>
      <Paper
        elevation={8}
        sx={{
          p: { xs: 2, sm: 4 },
          my: 8,
          borderRadius: 5,
          background: "#fff",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
        }}
      >
        {/* Header */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <img
            src={sheet.image.url}
            alt="form visual"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              boxShadow: "0 2px 16px #e3e6f0",
              marginBottom: 16,
              objectFit: "cover",
            }}
          />
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 800, color: "#253276", letterSpacing: 1 }}
          >
            {sheet.title}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: "#6c757d", mb: 2 }}
          >
            يرجى ملء البيانات التالية بدقة وسيتم التواصل معك في أقرب وقت
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Full name */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <PersonIcon color="primary" />
            <Typography variant="subtitle2" fontWeight={700}>
              الاسم بالكامل
            </Typography>
          </Box>
          <TextField
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="dense"
            required
            placeholder="اكتب اسمك هنا"
            sx={{
              background: "#f9f9f9",
              borderRadius: 2,
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#314DDF" },
              },
            }}
          />

          {/* Phone */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <PhoneIphoneIcon color="primary" />
            <Typography variant="subtitle2" fontWeight={700}>
              رقم الهاتف
            </Typography>
          </Box>
          <TextField
            fullWidth
            name="phone"
            type="tel"
            inputProps={{ inputMode: "numeric", maxLength: 15 }}
            value={formData.phone}
            onChange={handlePhoneChange}
            helperText="مثال: +201234567890 أو 0501234567"
            margin="dense"
            required
            placeholder="رقم الهاتف"
            sx={{
              background: "#f9f9f9",
              borderRadius: 2,
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#314DDF" },
              },
            }}
          />

          {/* City */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocationOnIcon color="primary" />
            <Typography variant="subtitle2" fontWeight={700}>
              المدينة
            </Typography>
          </Box>
          <TextField
            fullWidth
            name="city"
            value={formData.city}
            onChange={handleChange}
            margin="dense"
            required
            placeholder="المدينة"
            sx={{
              background: "#f9f9f9",
              borderRadius: 2,
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#314DDF" },
              },
            }}
          />

          {/* Section */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <AssignmentIndIcon color="primary" />
            <Typography variant="subtitle2" fontWeight={700}>
              القسم
            </Typography>
          </Box>
          <FormControl
            fullWidth
            margin="dense"
            sx={{ background: "#f9f9f9", borderRadius: 2, mb: 2 }}
            required
          >
            <InputLabel id="section-label">القسم</InputLabel>
            <Select
              labelId="section-label"
              name="section"
              value={formData.section}
              onChange={handleChange}
              disabled={isAllServicesLoading}
              sx={{
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": { borderRadius: 2 },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#314DDF",
                },
              }}
            >
              <MenuItem value="">
                <em>اختر قسم</em>
              </MenuItem>
              {Array.isArray(sections) && sections.length > 0 ? (
                sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    {section.title}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">لا توجد أقسام متاحة</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Service */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <MiscellaneousServicesIcon color="primary" />
            <Typography variant="subtitle2" fontWeight={700}>
              الخدمة
            </Typography>
          </Box>
          <FormControl
            fullWidth
            margin="dense"
            sx={{ background: "#f9f9f9", borderRadius: 2, mb: 2 }}
          >
            <InputLabel id="service-label">الخدمة</InputLabel>
            <Select
              labelId="service-label"
              name="service"
              value={formData.service || ""}
              onChange={handleChange}
              disabled={
                isServicesLoading || (!formData.section && isAllServicesLoading)
              }
              sx={{
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": { borderRadius: 2 },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#314DDF",
                },
              }}
            >
              <MenuItem value="">
                <em>اختر خدمة</em>
              </MenuItem>
              {(isServicesLoading && formData.section) ||
              (!formData.section && isAllServicesLoading) ? (
                <MenuItem value="">
                  <CircularProgress size={24} />
                </MenuItem>
              ) : Array.isArray(displayedServices) &&
                displayedServices.length > 0 ? (
                displayedServices.map((service) => (
                  <MenuItem
                    key={service._id || service.id}
                    value={String(service._id || service.id)}
                  >
                    {service.title}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">لا توجد خدمات متاحة</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="transition-all duration-300 ease-in-out"
            sx={{
              background: "linear-gradient(90deg, #314DDF 0%, #253276 100%)",
              color: "white",
              padding: "14px",
              fontSize: "22px",
              minWidth: "150px",
              borderRadius: "7px",
              mt: 3,
              fontWeight: 800,
              letterSpacing: 1,
              boxShadow: "0 4px 16px 0 rgba(49,77,223,0.10)",
              "&:hover": {
                background: "linear-gradient(90deg, #253276 0%, #314DDF 100%)",
                boxShadow: "0 6px 24px 0 rgba(49,77,223,0.15)",
              },
            }}
            size="large"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={28} sx={{ color: "#fff" }} />
            ) : (
              "إرسال"
            )}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Influence;