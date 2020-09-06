const convertKelvinToCelsius = (temp: number): string =>
  `${Math.round(temp - 273.15)}°`;

export default convertKelvinToCelsius;
