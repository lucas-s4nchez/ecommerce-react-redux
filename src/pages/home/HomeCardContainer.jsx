import { Box, Card, CardActionArea, CardContent } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";

export const HomeCardContainer = ({ children, redirectTo }) => {
  return (
    <Box
      sx={{
        marginBlock: 5,
        padding: 2,
        display: "flex",
        flexWrap: { md: "wrap" },
        justifyContent: { md: "space-evenly" },
        gap: 2,
        overflowX: "scroll",
      }}
    >
      {children}
      <Card sx={{ minWidth: 250, width: { md: 280 } }} title="Ver más">
        <CardActionArea
          sx={{ height: "100%" }}
          component={Link}
          to={redirectTo}
        >
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddOutlinedIcon sx={{ fontSize: 90, color: "primary.main" }} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
