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

const handleSearch = (e) => {
  const newSearchTerm = e.target.value;
  setSearchParams((prev) => {
    const newParams = new URLSearchParams(prev);
    if (newSearchTerm) {
      newParams.set("search", newSearchTerm);
      newParams.set("page", "1");
    } else {
      newParams.delete("search");
    }
    return newParams;
  });
};


const Sections = () => {
 


  const { sectionData } = useSectionData();

  return (
    <>
  
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        {sectionData?.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 5,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image.imageUrl}
                alt={item.title}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  fontWeight="bold"
                >
                  {item.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#314DDF",
                    fontWeight: "bold",
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "#253276",
                    },
                  }}
                >
                  احجز ميعادك
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>

  );
};

export default Sections;
