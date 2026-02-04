// Stub file for Storybook compatibility
export const generate2gisMapUrl = (lat: number, lon: number, zoom: number = 15): string => {
  return `https://2gis.ru/moscow?m=${lon},${lat}/${zoom}`;
};

export default generate2gisMapUrl;
