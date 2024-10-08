import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectorIngredients } from '../../services/ingredients/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

export const IngredientDetails: FC = () => {
  const ingredients = useAppSelector(selectorIngredients);
  const { id } = useParams();

  const ingredientData = ingredients.find((i) => i._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
