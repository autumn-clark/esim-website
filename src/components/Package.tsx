export type Package = {
  packageCode: string;
  slug: string;
  name: string;
  price: number;
  currencyCode: string;
  volume: number;
  duration: number;
  durationUnit: string;
  location: string;
  description: string;
  locationNetworkList: {
    locationName: string;
    locationLogo: string;
    operatorList: { operatorName: string; networkType: string; }[];
  }[];
};
