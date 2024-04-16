import React from 'react';
import { CardsItemProps as CardItemProps } from '../../types';


const CardItem: React.FC<CardItemProps> = ({ cardNumber, bankName, imagePath }) => {
  return (
    <div className="card-container">
      <p className="fw-bold text-dark">Card Number: {cardNumber}</p>
      <p className="fw-bold text-dark">Bank Name: {bankName}</p>
      <img src={imagePath} alt=" className=" />
    </div>
  );
};

export default CardItem;
