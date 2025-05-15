import React from "react";
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

const Influence = () => {
  return (
    <>
      <div className="bg-white rounded-2xl p-8">
        <span className="text-2xl text-gray-600">احجز موعدك</span>
        <form className="p-8">
          <TextField
            fullWidth
            label="الاسم"
            name="name"
            sx={{ marginBottom: "15px", direction: "rtl" }}
            required
          />
          <TextField
            fullWidth
            label="رقم الهاتف"
            name="phone"
            sx={{ marginBottom: "15px", direction: "rtl" }}
            required
          />
          <TextField
            fullWidth
            label="المدينة"
            name="city"
            sx={{ marginBottom: "15px", direction: "rtl" }}
            required
          />
          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <InputLabel id="service-label">الخدمة</InputLabel>
            <Select labelId="service-label" name="service"></Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <InputLabel id="section-label">القسم</InputLabel>
            <Select labelId="section-label" name="section"></Select>
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
            >
              "احجز ميعادك"
            </Button>
          </CardActions>
        </form>
      </div>
    </>
  );
};

export default Influence;
