import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

import useServiceDetails from "../../../hooks/Services/useServices";
import { useParams } from "react-router-dom";
import Services from "../../../components/Home Components/Services/Services";

export default function Service() {
  const { reference } = useParams();
  const { data, loading, error } = useServiceDetails(reference);

  if (loading) return <Typography>جاري التحميل...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <React.Fragment>
      <Container sx={{ mt: 5, mb: 5 }} maxWidth="lg">
        <Grid spacing={3} alignItems="stretch">
          <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }} sx={{ mb: 2 }}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                image={data?.image?.backgroundLarge}
                alt={data?.title}
                sx={{
                  width: "100%",
                  height: "500px",
                }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}>
            <Card sx={{ backgroundColor: "#F2F2F2", height: "100%" }}>
              <CardContent sx={{ textAlign: "right" }}>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 32 }}
                >
                  {data?.title}
                </Typography>

                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  {data?.desc?.split("\n").slice(0, 4).join(" ")}
                </Typography>

                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  القسم: {data?.sectionId?.title}
                </Typography>

                <Typography variant="body2">
                  تم الإنشاء في:
                  {new Date(data?.createdAt).toLocaleDateString("ar-EG")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Services />
    </React.Fragment>
  );
}
