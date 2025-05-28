import './App.css';
import { useState } from "react";
import tabData from './Data';
import felyChef from './img/fely_chef.png';
// Datos separados por pestaña


export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [ingredients, setIngredients] = useState(tabData[0].ingredients);

  const currentTab = tabData[tabIndex];
  const mealsData = currentTab.meals;
  

  const toggleIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].selected = !newIngredients[index].selected;
    setIngredients(newIngredients);
  };

  const handleTabChange = (index) => {
    setTabIndex(index);
    // Reset ingredientes para la nueva pestaña
    const resetIngredients = tabData[index].ingredients.map((i) => ({
      ...i,
      selected: false,
    }));
    setIngredients(resetIngredients);
  };

  const selectedIngredients = ingredients.filter((i) => i.selected);
  const selectedTypes = selectedIngredients.map((i) => i.type);

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
  /*
  function getMatchingIngredients(meal) {
    const matches = selectedIngredients.filter(
      (ing) =>
        ing.type === meal.ingredient1 || ing.type === meal.ingredient2
    );
    return matches.map((ing) => ing.name).join(", ");
  }
  */


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


  return (
    <div>
      {/* Pestañas */}
      <div className="button-container">
        {tabData.map((tab, index) => (
          <button className="btn-with-image"
            key={index}
            onClick={() => handleTabChange(index)}
          >
            <img src={felyChef} alt="Fely Chef" className="btn-image" />
            <span className="btn-label">{tab.label}</span>
            
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="flex-container">


          <div class="card card--ingredients">
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.sort((a, b) => a.name.localeCompare(b.name)).map((ing, i) => (
                  <tr key={ing.name}>
                    <td 
                      onClick={() => toggleIngredient(i)}
                      className={`ingredient-cell ${ingredients[i]['selected'] ? "selected" : ""}`}
                    >{ing.name}</td>
                    {/*
                    <td>{ing.type}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={ing.selected}
                        onChange={() => toggleIngredient(i)}
                      />
                    </td>
                    */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        <div class="card card--meals">
          <div class = "pepe">
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>Ingredient 1</th>
                  <th>Ingredient 2</th>
                  <th>Buff</th>
                 {/* <th>ingredients</th>*/}
                </tr>
              </thead>
              <tbody>
                {mealsData.filter(canMakeMeal).map((meal, i) => (
                  <tr key={i}>
                    {getValidIngredientTuple(meal.ingredient1,meal.ingredient2)}
                    {/*
                    <td>{meal.ingredient1}</td>
                    <td>{meal.ingredient2}</td>
                    */}
                    <td>{meal.effect}</td>
                    {/*<td>{getMatchingIngredients(meal)}</td>*/}
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