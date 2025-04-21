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
import M1 from "../../../assets/Iamges/M1.jpg";

import useServiceDetails from "../../../hooks/Services/useServices";
import { useParams } from "react-router-dom";
import Services from "../../../components/Home Components/Services/Services";

export default function Service() {
  const { reference } = useParams();
  console.log(reference, "reference");

  const { data, loading, error } = useServiceDetails(reference);

  console.log(data);

  if (loading) return <Typography>جاري التحميل...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <React.Fragment>
      <br />
      <br />
      <Container>
        <Grid container>
          <Grid className="imageCont" size={6}>
            <Card
              className="card"
              sx={{
                minWidth: 275,
                height: "580px",
                width: "600",
                backgroundColor: "#1F2B6C",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                sx={{
                  height: "514px",
                  width: "456px",
                  borderWidth: "6px",
                  borderColor: "#F2F2F2",
                }}
                component="img"
                height="194"
                image={data.image.url}
                alt="Paella dish"
              />
            </Card>
          </Grid>

          <Grid className="contantCont" size={6}>
            <Card
              sx={{
                minWidth: 275,
                height: "580px",
                width: "600",
                backgroundColor: "#F2F2F2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ textAlign: "right", margin: "20px" }}>
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{ color: "#1F2B6C", fontSize: 45 }}
                >
                  {data.title}
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  sx={{ marginTop: "35px" }}
                >
                  {data.desc}
                </Typography>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "35px",
                  }}
                >
                  <Button
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
                    احجز ميعادك{" "}
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Services />
    </React.Fragment>
  );
}
