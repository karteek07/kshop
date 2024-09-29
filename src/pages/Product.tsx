import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Product } from "../types";
import { CartContext } from "../context/CartContext";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ImageWrapper = styled.div`
  flex: 1 1 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
`;

const Details = styled.div`
  flex: 2 1 300px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: #2ecc71;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const AddToCartButton = styled.button`
  padding: 10px 15px;
  background-color: #e67e22;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d35400;
  }
`;

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Container>Loading product...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  if (!product) {
    return <Container>Product not found.</Container>;
  }

  return (
    <Container>
      <ImageWrapper>
        <ProductImage src={product.image} alt={product.title} />
      </ImageWrapper>
      <Details>
        <Title>{product.title}</Title>
        <Price>₹{(product.price * 82).toFixed(2)}</Price>
        <Description>{product.description}</Description>
        <AddToCartButton onClick={() => addToCart(product)}>
          Add to Cart
        </AddToCartButton>
      </Details>
    </Container>
  );
};

export default ProductPage;
