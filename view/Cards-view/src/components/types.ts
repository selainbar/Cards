import { ReactNode } from "react";


interface CardItemProps{
    cardNumber:number;
    bankName:string;
    imagePath:string;
  }
  

interface Card{
    cardNumber: number;
    creationDate:Date;
    cardPicture:string;
    isBlocked:boolean;
    isDigital:boolean;
    cardFrame:number;
    bankCode:number;
}
interface Bank{

    Code:Number;
    Name:string;
    description:string;
}
export{Card,Bank,CardsItemProps};
