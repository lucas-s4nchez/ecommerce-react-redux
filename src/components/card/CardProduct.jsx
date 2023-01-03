import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CardActionArea,
  Skeleton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";

export const CardProduct = ({ model, images, price }) => {
  const { isLoading } = useSelector((state) => state.products);
  return (
    <Card sx={{ minWidth: 250, maxWidth: 280 }}>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <CardActionArea>
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={194} />
        ) : (
          <CardMedia
            component="img"
            height="194"
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt="Zapatilla"
          />
        )}

        <CardContent>
          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
          ) : (
            <Typography>{model}</Typography>
          )}
          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
          ) : (
            <Typography>{price}</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
