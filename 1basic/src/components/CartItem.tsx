import {
  ButtonGroup,
  Divider,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useCart } from '../store/CartContext';

type TProps = {
  title: string;
  price: number;
  id: number;
  amount: number;
};

const CartItem: React.FC<TProps> = ({ title, price, id, amount }) => {
  const { removeFromCart, addToCart } = useCart();
  const handlePlusClick = () => {
    addToCart({ title, price, id, amount: 1 });
  };
  const handleMinusClick = () => {
    removeFromCart(id);
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
            <Typography color="secondary">${price}</Typography>
          </Stack>
          <Stack width="120px">
            <Stack justifyContent="center" alignItems="center" direction="row">
              <Typography>Amount: {amount}</Typography>
            </Stack>
            <Stack flexGrow="1" justifyContent="center" direction="row">
              <IconButton onClick={handleMinusClick} aria-label="minus" color="primary">
                <RemoveCircleOutlineIcon />
              </IconButton>
              <IconButton onClick={handlePlusClick} aria-label="plus" color="primary">
                <ControlPointIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartItem;
