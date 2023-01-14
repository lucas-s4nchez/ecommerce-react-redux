import {
  Box,
  Divider,
  LinearProgress,
  List,
  ListItem,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import {
  ProductRatingsContainerStyled,
  ProductReviewsContainerStyled,
} from "./ProductDetailsStyles";
import { useSelector } from "react-redux";

export const ProductReviews = ({ product }) => {
  const { isLoading } = useSelector((state) => state.products);

  if (isLoading) {
    return (
      <>
        <Skeleton variant="rectangular" width="100%" height={300} />
      </>
    );
  }

  const { reviews } = product;

  const averageRating = Number(
    (
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
    ).toFixed(1)
  );

  const getProgressValue = (number) => {
    const value =
      (reviews.filter((p) => p.rating === number).length / reviews.length) *
      100;
    return value;
  };

  const getFormattedDate = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("es-ES").format(newDate);
  };

  return (
    <>
      {reviews.length >= 1 && (
        <Box sx={{ paddingLeft: { md: "50px" }, maxWidth: "1000px" }}>
          <Typography variant="h5">Opiniones del producto</Typography>
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <ProductRatingsContainerStyled>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "40px",
                      fontWeight: "bolder",
                      lineHeight: 1.03,
                    }}
                  >
                    {averageRating}
                  </Typography>
                </Box>
                <Box>
                  <Rating
                    name="read-only"
                    value={averageRating}
                    precision={0.1}
                    readOnly
                    sx={{ color: "primary.main" }}
                  />
                  <Typography sx={{ fontSize: "14px", color: "GrayText" }}>
                    {`${reviews.length} calificaciones`}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "100%", maxWidth: "100%" }}>
                <List>
                  <ListItem sx={{ display: "flex", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={getProgressValue(5)}
                      sx={{ width: "100%", borderRadius: "10px" }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "12px", lineHeight: 1 }}>
                        5
                      </Typography>
                      <StarOutlinedIcon
                        sx={{ fontSize: "16px", color: "secondary.light" }}
                      />
                    </Box>
                  </ListItem>

                  <ListItem sx={{ display: "flex", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={getProgressValue(4)}
                      sx={{ width: "100%", borderRadius: "10px" }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "12px", lineHeight: 1 }}>
                        4
                      </Typography>
                      <StarOutlinedIcon
                        sx={{ fontSize: "16px", color: "secondary.light" }}
                      />
                    </Box>
                  </ListItem>

                  <ListItem sx={{ display: "flex", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={getProgressValue(3)}
                      sx={{ width: "100%", borderRadius: "10px" }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "12px", lineHeight: 1 }}>
                        3
                      </Typography>
                      <StarOutlinedIcon
                        sx={{ fontSize: "16px", color: "secondary.light" }}
                      />
                    </Box>
                  </ListItem>

                  <ListItem sx={{ display: "flex", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={getProgressValue(2)}
                      sx={{ width: "100%", borderRadius: "10px" }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "12px", lineHeight: 1 }}>
                        2
                      </Typography>
                      <StarOutlinedIcon
                        sx={{ fontSize: "16px", color: "secondary.light" }}
                      />
                    </Box>
                  </ListItem>

                  <ListItem sx={{ display: "flex", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={getProgressValue(1)}
                      sx={{ width: "100%", borderRadius: "10px" }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "12px", lineHeight: 1 }}>
                        1
                      </Typography>
                      <StarOutlinedIcon
                        sx={{ fontSize: "16px", color: "secondary.light" }}
                      />
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </ProductRatingsContainerStyled>

            <ProductReviewsContainerStyled>
              {reviews.map((review) => {
                return (
                  <Box
                    sx={{ padding: 2 }}
                    key={`${review.userName}${review.fecha}`}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Rating
                        readOnly
                        name="size-small"
                        value={review.rating}
                        size="small"
                        sx={{ color: "primary.main" }}
                      />
                      <Typography sx={{ fontSize: "14px", color: "GrayText" }}>
                        {getFormattedDate(review.fecha)}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "14px", color: "GrayText" }}>
                      {review.userName}
                    </Typography>
                    <Typography sx={{ marginBottom: 3, marginTop: 1 }}>
                      {review.comment}
                    </Typography>
                    <Divider />
                  </Box>
                );
              })}
            </ProductReviewsContainerStyled>
          </Box>
        </Box>
      )}
    </>
  );
};
