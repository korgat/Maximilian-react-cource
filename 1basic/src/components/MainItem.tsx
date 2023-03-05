import { Button, Divider, ListItem, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useCart } from '../store/CartContext';

type TProps = {
  title: string;
  price: number;
  id: number;
  description: string;
};

const MainItem: React.FC<TProps> = ({ title, price, id, description }) => {
  const [amount, serAmount] = useState(1);
  const { addToCart } = useCart();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    serAmount(+e.currentTarget.value);
  };
  const orderClickHandler = () => {
    const cartItem = {
      title,
      price,
      id,
      amount: amount,
    };
    addToCart(cartItem);
  };
  return (
    <>
      <ListItem
        sx={{
          padding: '15px 0',
        }}
        disableGutters>
        <Stack
          sx={{
            width: 1,
          }}
          direction="row"
          justifyContent="space-between">
          <Stack>
            <Typography variant="h6">{title}</Typography>
            <Typography color="#9a9a9a" variant="body2">
              {description}
            </Typography>
            <Typography color="secondary">${price}</Typography>
          </Stack>
          <Stack width="120px">
            <Stack mb={2} alignItems="center" direction="row">
              <Typography>Amount:</Typography>
              <TextField
                size="small"
                variant="outlined"
                onChange={handleAmountChange}
                value={amount}
              />
            </Stack>
            <Button onClick={orderClickHandler} variant="contained">
              Order
            </Button>
          </Stack>
        </Stack>
      </ListItem>
      <Divider />
    </>
  );
};

export default MainItem;
