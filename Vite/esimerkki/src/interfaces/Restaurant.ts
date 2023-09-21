interface Restaurant {
    _id: string;
    name: string;
    location: {
        type: 'Point';
        coordinates: number[];
    };
    address: string;
    company: 'Sodexo' | 'Compass Group';
    city: string;
    postalCode: string;
    phone: string;
    companyId: number;


}

export type {Restaurant};
