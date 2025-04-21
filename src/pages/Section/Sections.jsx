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

import useSectionData from "../../hooks/Sections/UseSections";

const Sections = () => {
  const { sectionData } = useSectionData();

  console.log(sectionData, "sectionData");

  return (
    <>
    <br /><br />
       <Container maxWidth="lg">
        <Grid spacing={5} container>

          {sectionData?.map((item) => (
            <Grid  size={4} item xs={12} md={4} key={item._id}>
              <Card sx={{ width: 320, maxWidth: 500, height: 400 }}>
                <CardMedia
                  sx={{ height: 250 }}
                  image={item.image.imageUrl}
                  title="green iguana"
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.desc}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

        </Grid>
      </Container>
      <br />
    </>
  );
};

export default Sections;
