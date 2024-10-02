import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { UserInfo } from "../types";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #27ae60;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #1e8449;
  }
`;

const ConfirmationMessage = styled.div`
  text-align: center;
  padding: 50px 0;
`;

const Checkout: React.FC = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    address: "",
    deliveryInstructions: "",
  });

  const [errors, setErrors] = useState<Partial<UserInfo>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });

    // Clear error for the field
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<UserInfo> = {};

    if (!userInfo.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!userInfo.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(userInfo.phone.trim())) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!userInfo.address.trim()) {
      newErrors.address = "Address is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      // Here, you would typically send the order to the backend.
      // For this example, we'll just display a confirmation message.

      console.log("Order Submitted:", { userInfo, cart });
      setSubmitted(true);
      clearCart();

      // Optionally, navigate to a confirmation page after a delay
      setTimeout(() => {
        navigate("/kshop");
      }, 5000);
    }
  };

  if (submitted) {
    return (
      <ConfirmationMessage>
        <h2>Thank You for Your Order!</h2>
        <p>Your order has been placed successfully.</p>
        <p>You will be redirected to the home page shortly.</p>
      </ConfirmationMessage>
    );
  }

  if (cart.length === 0) {
    return (
      <Container>
        <h1>Checkout</h1>
        <p>
          Your cart is empty. Please add products to your cart before proceeding
          to checkout.
        </p>
        <button onClick={() => navigate("/kshop")}>Go to Home</button>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Checkout</h1>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name*</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

        <Label htmlFor="phone">Phone Number*</Label>
        <Input
          type="text"
          id="phone"
          name="phone"
          value={userInfo.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
        {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}

        <Label htmlFor="address">Address*</Label>
        <TextArea
          id="address"
          name="address"
          value={userInfo.address}
          onChange={handleChange}
          placeholder="Enter your address"
          rows={4}
        />
        {errors.address && (
          <span style={{ color: "red" }}>{errors.address}</span>
        )}

        <Label htmlFor="deliveryInstructions">Delivery Instructions</Label>
        <TextArea
          id="deliveryInstructions"
          name="deliveryInstructions"
          value={userInfo.deliveryInstructions}
          onChange={handleChange}
          placeholder="Any special instructions for delivery"
          rows={3}
        />

        <SubmitButton type="submit">Place Order</SubmitButton>
      </Form>
    </Container>
  );
};

export default Checkout;
