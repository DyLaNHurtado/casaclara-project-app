const formatNumber = (num: number, divisor: number, suffix: string): string => {
  const formattedNumber = num / divisor;
  return `${Number.isInteger(formattedNumber) ? formattedNumber.toFixed(0) : formattedNumber.toFixed(2)}${suffix}`;
};

const formatLongNumber = (num: number, divisor: number, singular: string, plural: string): string => {
  const formattedNumber = num / divisor;
  const formattedString = Number.isInteger(formattedNumber) ? formattedNumber.toFixed(0) : formattedNumber.toFixed(2);
  return `${formattedString} ${formattedNumber === 1 ? singular : plural} de euros`;
};

export const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return formatNumber(price, 1000000, 'M €');
  } else if (price >= 1000) {
    return formatNumber(price, 1000, 'k €');
  }
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);
};

export const formatPriceLong = (price: number): string => {
  if (price >= 1000000) {
    return formatLongNumber(price, 1000000, 'millón', 'millones');
  } else if (price >= 1000) {
    return formatLongNumber(price, 1000, 'mil', 'miles');
  }
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);
};

export const formatPriceWithDots = (price: number): string => {
  const options: Intl.NumberFormatOptions = { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 2 };
  return price.toLocaleString('es-ES', options);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};