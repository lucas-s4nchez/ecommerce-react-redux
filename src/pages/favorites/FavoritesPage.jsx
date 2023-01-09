import { useSelector } from "react-redux";

export const FavoritesPage = () => {
  const { favorites } = useSelector((state) => state.user);
  return (
    <>
      {favorites.map((item) => (
        <h2 key={item.id}>{item.brand}</h2>
      ))}
    </>
  );
};
