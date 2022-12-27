import { Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, title }) => {
  return (
    <Grid
      item
      sx={{
        width: { sm: 450 },
        backgroundColor: "white.main",
        padding: { xs: 2, sm: 3 },
        borderRadius: 2,
        boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.2)",
        margin: "auto",
      }}
    >
      <Typography variant="h5" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {children}
    </Grid>
  );
};
