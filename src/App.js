import { useState } from "react";
import felyChefImage from './img/fely_chef.png';
import data from './Data';
import './App.css';

export default function App() {

  const {tabData,emojisTypeIngredient} = data;
  const [tabIndex, setTabIndex] = useState(0);
  const [ingredients, setIngredients] = useState(tabData[0].ingredients);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const currentTab = tabData[tabIndex];
  const mealsData = currentTab.meals;
  const selectedIngredients = ingredients.filter((i) => i.selected);
  const selectedTypes = selectedIngredients.map((i) => i.type);

  function toggleIngredient(index){
    const newIngredients = [...ingredients];
    newIngredients[index].selected = !newIngredients[index].selected;
    setIngredients(newIngredients);
  }

  function handleTabChange(index){
    setSelectedTabIndex(index);
    setTabIndex(index);
    const resetIngredients = tabData[index].ingredients.map((i) => ({
      ...i,
      selected: false,
    }));
    setIngredients(resetIngredients);
  };

  function canMakeMeal(meal) {
    if (meal.ingredient1 === meal.ingredient2) {
      let count = selectedTypes.filter((e) => e === meal.ingredient1).length;
      return count >= 2;
    } else {
      return (
        selectedTypes.includes(meal.ingredient1) &&
        selectedTypes.includes(meal.ingredient2)
      );
    }
  }

  function getValidIngredientTuple(typeIngredient1, typeIngredient2) {
    var ingr1 = ingredients
              .filter(ingr => ingr.type === typeIngredient1 && ingr.selected)
              .map(ingr => ingr.name);
    var ingr2 = ingredients
          .filter(ingr => ingr.type === typeIngredient2 && ingr.selected)
          .map(ingr => ingr.name);
    if(typeIngredient1 === typeIngredient2){
          return (
          <>
            <td>{ingr1[0]}</td>
            <td>{ingr1[1]}</td>
          </>
          );
     }else{
          return (
          <>
            <td>{ingr1[0]}</td>
            <td>{ingr2[0]}</td>
          </>
          );
    }
  }

  function emojiDeIngrediente(ingredienteNombre) {
  const resultado = emojisTypeIngredient.find(
    (item) => item.name.toLowerCase() === ingredienteNombre.toLowerCase()
  );
  return resultado ? resultado.emoji : null; 
}

  return (
    <div>
      {/* Pestañas */}
      <div className="button-container">
        {tabData.map((tab, index) => (
          <button className={`btn-with-image ${selectedTabIndex === index ? "selected-tab" : ""}`}
            key={index}
            onClick={() => handleTabChange(index)}>
            <img src={felyChefImage} alt="Fely Chef" className="btn-image" />
            <span className="btn-label">{tab.label}</span>
          </button>
        ))}
      </div>
      {/* Contenido */}
      <div className="flex-container">
          <div class="card card--ingredients">
            <div class = "margin-table">
              <table className="table-center" border="1" cellPadding="0" cellSpacing="0">
                <tbody>
                  {ingredients
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((ing, i) => (
                      <tr key={ing.name}>
                        <td className={`align-left ingredient-cell ${ingredients[i].selected ? 'selected' : ''}`} >
                          <div className="row-flex" onClick={() => toggleIngredient(i)}>
                            <span className="emoji">{emojiDeIngrediente(ing.type)}</span>
                            <span className={`ingredient ${ing.selected ? "selected" : ""}`}>
                              {ing.name}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

        <div class="card card--meals">
          <div class = "margin-table">
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>Ingredient 1</th>
                  <th>Ingredient 2</th>
                  <th>Buff</th>
                </tr>
              </thead>
              <tbody>
                {mealsData.filter(canMakeMeal).map((meal, i) => (
                  <tr key={i}>
                    {getValidIngredientTuple(meal.ingredient1,meal.ingredient2)}
                    <td>{meal.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}