const BlackFridayBanner = () => {
  const sale = await getActiveSaleByCouponCode("BFRIDAY");

  return <div>BlackFridayBanner</div>;
};

export default BlackFridayBanner;
