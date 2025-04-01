export interface IFlow {
  _id: string;
  description: string;
  enable: boolean;
}

export interface Service {
  _id: string;
  name: string;
}

export interface IOption {
  _id: string;
  group: string;
  name: string;
  services: Service[];
  price: number;
  __v: string | number;
}

export interface IProvider {
  _id: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  nameMainContact: string;
  images: string[];
  description: string;
  address: string;
  city: string;
  state: string;
  county: string;
  country: string;
  coveredLocationId: string;
  createdAt: string;
  updatedAt: string;
}
