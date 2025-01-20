export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);
  };
  
  export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };