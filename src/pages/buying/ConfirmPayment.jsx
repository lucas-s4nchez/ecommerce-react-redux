import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ConfirmPayment = () => {
  const { cards, paymentMethod, activeAddress } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!activeAddress) {
      navigate("/buying/selectAddress");
    }
    if (!paymentMethod) {
      navigate("/buying/selectPaymentMethod");
    }
  }, []);
  console.log(paymentMethod);
  return (
    <>
      <h5>jijijijiji</h5>
    </>
  );
};
