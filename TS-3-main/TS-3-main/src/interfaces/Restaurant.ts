interface Restaurant {
    name: string;
    address: string;
    postalCode: number;
    city: string;
    phone: string;
    company: string;
    location: {
      type: string;
      coordinates: number[];
    };
  }
  export { Restaurant };
