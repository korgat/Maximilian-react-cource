import { AppBar, Button, Toolbar, Typography, Box, Chip, Modal, List } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import CartItem from './CartItem';
import { useCart } from '../store/CartContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, totalPrice } = useCart();
  const totalAmount = items.reduce((acc, obj) => acc + obj.amount, 0);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: 'background.default',
        }}
        position="static">
        <Toolbar
          sx={{
            margin: '0 10%',
          }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ReactMeals
          </Typography>
          <Box>
            <Button
              onClick={toggleCart}
              color="inherit"
              startIcon={<ShoppingCartIcon />}
              disableRipple>
              <Typography>Your Cart</Typography>
              <Chip
                sx={{ marginLeft: '10px', width: '40px' }}
                label={totalAmount}
                color="secondary"
              />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Modal
        open={isCartOpen}
        onClose={toggleCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your orders
          </Typography>
          <List
            sx={{
              width: '100%',
              height: '400px',
              overflow: 'auto',
              bgcolor: 'background.paper',
              marginTop: '50px',
              borderRadius: '5px',
              padding: '10px 20px',
            }}>
            {items.map((obj) => (
              <CartItem key={obj.id} {...obj} />
            ))}
          </List>
          <Typography>Total price: {totalPrice}</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
