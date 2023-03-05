import { List } from '@mui/material';
import { TAction } from '../@types/types';
import MainItem from './MainItem';

const meals = [
  { title: 'Sushi', description: 'Finest fish and vegetables', price: 22.99, id: 1 },
  { title: 'Pizza', description: 'Tasty italian pizza', price: 12.99, id: 2 },
  { title: 'Soup', description: 'Thick mushroom soup', price: 9.99, id: 3 },
  { title: 'Taco', description: 'Real spicy mexican taco', price: 7.99, id: 4 },
];

const MainList: React.FC = () => {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        marginTop: '50px',
        borderRadius: '5px',
        padding: '10px 20px',
      }}>
      {meals.map((obj) => (
        <MainItem key={obj.id} {...obj} />
      ))}
    </List>
  );
};

export default MainList;
