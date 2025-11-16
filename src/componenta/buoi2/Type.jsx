import { ImageSourcePropType } from "react-native";

export type Product1 = {
  id: string;
  name: string;
  price: string;
  image: ImageSourcePropType;
};

export type HomeStackParamList = {
  Home: undefined;
  Details: { product: Product1 };
  About: undefined;
  Categories: undefined;
};
