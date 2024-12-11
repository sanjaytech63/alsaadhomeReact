import React from 'react';
import { Grid, Box } from '@mui/material';
import ProductTitle from './ProductTitle';
import PriceAndRating from './PriceAndRating';
import ColorOptions from './ColorOptions';
import SizeInfo from './SizeInfo';
import AvailabilityInfo from './AvailabilityInfo';
import DeliveryText from './DeliveryText';
import PaymentOptions from './PaymentOptions';
import QuantityControl from './QuantityControl';
import AddToCartActions from './AddToCartActions';
import ProductInfo from './ProductInfo';
import ProductFeatures from './ProductFeatures';
import ProductDetailsTable from './ProductDetailsTable';

const MainInfoCom = ({
  products,
  productInfo,
  selectedColor,
  setSelectedColor,
  count,
  incrementChange,
  decrementChange,
  proDetails,
  variants
}) => {
  return (
    <Grid item xs={12} md={6}>
      <Box>
        {products.map(product => (
          <Box key={product.id}>
            <ProductTitle title={product.title} />
            <PriceAndRating product={product} />
            <ColorOptions
              colorOptions={variants}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
            <SizeInfo size={product.size} />
            <AvailabilityInfo availability={product.availability} />
            <DeliveryText deliveryText={product.deliveryText} />
            <PaymentOptions paymentText={product.paymentText} />
            <QuantityControl
              count={count}
              incrementChange={incrementChange}
              decrementChange={decrementChange}
            />
            <AddToCartActions />
          </Box>
        ))}
      </Box>
      <Box>
        {productInfo.map((info, index) => (
          <Box key={index}>
            <ProductInfo proDetails={proDetails} />
            <ProductFeatures features={info.features} />
            <ProductDetailsTable productDetails={info.productDetails} />
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

export default MainInfoCom;
