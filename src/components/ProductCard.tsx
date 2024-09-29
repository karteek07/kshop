import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../types";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.3s;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  padding: 15px;
  height: 92%;

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;

const ProductImage = styled.img`
  object-fit: contain;
  max-width: 100%;
  height: 150px;
  margin-bottom: 15px;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: #2ecc71;
  margin-bottom: 15px;
`;

const DetailsButton = styled(Link)`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #2980b9;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <Top>
        <ProductImage src={product.image} alt={product.title} />
        <ProductTitle>{product.title}</ProductTitle>
      </Top>
      <Bottom>
        <ProductPrice>₹{(product.price * 82).toFixed(2)}</ProductPrice>
        <DetailsButton to={`/product/${product.id}`}>
          View Details
        </DetailsButton>
      </Bottom>
    </Card>
  );
};

export default ProductCard;
