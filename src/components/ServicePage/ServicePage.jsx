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

import M1 from "../../assets/Iamges/M1.jpg"

export default function ServicePage () {
  return (
    <>

    <br />
      <Container>
        <Grid container>
          <Grid className="imageCont" size={6}>
            <Card className="card" sx={{ minWidth: 275 ,height:"580px",width:"600",backgroundColor:"#1F2B6C",display:"flex",justifyContent:"center",alignItems:"center" }}>
            <CardMedia
             sx={{height:"514px",width:"456px",borderWidth:"6px", borderColor: "#F2F2F2" }}

              component="img"
              height="194"
              image={M1}
              alt="Paella dish"
            />{" "}

            </Card>
          </Grid>

          <Grid className="contantCont" size={6}>
            <Card sx={{ minWidth: 275 ,height:"580px",width:"600",backgroundColor:"#F2F2F2" }}>
              <CardContent sx={{ textAlign: "right" }}>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 35 }}
                >
                  زراعة الأسنان: استعد لابتسامة طبيعية وثقة بالنفس
                </Typography>

                <Typography variant="h5" component="div">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </Typography>

                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </Typography>

                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>

              <CardActions sx={{display:"flex",justifyContent:"flex-end"}}>
                <Button sx={{backgroundColor:"#314DDF",color:"white",padding:"15px"}} size="large">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}