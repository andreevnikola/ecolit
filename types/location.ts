export interface ILocation {
  id: number;
  latitude: number;
  longitude: number;
  type: 'bin' | 'store';
  place_info: {
    image_url: string;
    name: string;
    description: string;
    website: string;
    logo_url: string;
  };
}
