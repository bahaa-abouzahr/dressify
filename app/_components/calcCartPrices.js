export function calcCartPrices( cart, deliveryFee = 3.5, freeLimit = 50) {

  const total = Number(
    cart.reduce((acc, cur) => acc + (cur.product_variants.sale_percentage 
      ? cur.price * (1 - (cur.product_variants.sale_percentage/100)) * cur.quantity
      : cur.price * cur.quantity) , 0).toFixed(2)
);
  const freeDelivery = total >= freeLimit;
  const finalPrice = freeDelivery 
    ? total 
    : Number(total + 3.5).toFixed(2);

  return {total, freeDelivery, finalPrice}
}

