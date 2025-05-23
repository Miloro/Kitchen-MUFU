import React, { useState } from "react";

// Datos separados por pestaña
const tabData = [
  {
    label: "1 Michi",
    ingredients: [
      { name: "Meat Scraps", type: "Meat", selected: false },
      { name: "Rubbery Jerky", type: "Meat", selected: false },
      { name: "Tough Meat", type: "Meat", selected: false },
      { name: "Chunky Rice", type: "Bran", selected: false },
      { name: "Furahiya Wheat", type: "Bran", selected: false },
      { name: "Mixed Beans", type: "Bran", selected: false },
      { name: "Bone Taco", type: "Fish", selected: false },
      { name: "Clamchip", type: "Fish", selected: false },
      { name: "Scalefish", type: "Fish", selected: false },
      { name: "Oily Raisins", type: "Fruit", selected: false },
      { name: "Jungle Onion", type: "Veggie", selected: false },
      { name: "Pumpkin", type: "Veggie", selected: false },
      { name: "Twinshroom", type: "Veggie", selected: false },
      { name: "Powdered Cheese", type: "Milk", selected: false },
      { name: "Sticky Cream", type: "Milk", selected: false },
      { name: "Hopi", type: "Drink", selected: false },
    ],
    meals:[
      { ingredient1: "Meat", ingredient2: "Meat", effect: "HP +10" },
      { ingredient1: "Meat", ingredient2: "Bran", effect: "HP +10" },
      { ingredient1: "Meat", ingredient2: "Fish", effect: "Stm -25" },
      { ingredient1: "Meat", ingredient2: "Fruit", effect: "Nothing" },
      { ingredient1: "Meat", ingredient2: "Veggie", effect: "Stm +25" },
      { ingredient1: "Meat", ingredient2: "Milk", effect: "Nothing" },
      { ingredient1: "Meat", ingredient2: "Drink", effect: "Atk (S)" },
      { ingredient1: "Bran", ingredient2: "Bran", effect: "Stm +25" },
      { ingredient1: "Bran", ingredient2: "Fish", effect: "HP +10" },
      { ingredient1: "Bran", ingredient2: "Fruit", effect: "Ice +3" },
      { ingredient1: "Bran", ingredient2: "Veggie", effect: "Stm -25" },
      { ingredient1: "Bran", ingredient2: "Milk", effect: "Nothing" },
      { ingredient1: "Bran", ingredient2: "Drink", effect: "Stm -25" },
      { ingredient1: "Fish", ingredient2: "Fish", effect: "Atk (S)" },
      { ingredient1: "Fish", ingredient2: "Fruit", effect: "HP -10" },
      { ingredient1: "Fish", ingredient2: "Veggie", effect: "Stm +25" },
      { ingredient1: "Fish", ingredient2: "Milk", effect: "Nothing" },
      { ingredient1: "Fish", ingredient2: "Drink", effect: "Def +10" },
      { ingredient1: "Fruit", ingredient2: "Fruit", effect: "-----------" },
      { ingredient1: "Fruit", ingredient2: "Veggie", effect: "HP +20" },
      { ingredient1: "Fruit", ingredient2: "Milk", effect: "Stm +25" },
      { ingredient1: "Fruit", ingredient2: "Drink", effect: "HP -10" },
      { ingredient1: "Veggie", ingredient2: "Veggie", effect: "Def +10" },
      { ingredient1: "Veggie", ingredient2: "Milk", effect: "Nothing" },
      { ingredient1: "Veggie", ingredient2: "Drink", effect: "Nothing" },
      { ingredient1: "Milk", ingredient2: "Milk", effect: "Nothing" },
      { ingredient1: "Milk", ingredient2: "Drink", effect: "HP -10" },
    ],
  },
  {
    label: "2 Michis",
    ingredients: [
      { name: "Cubesteak", type: "Meat", selected: false },
      { name: "Spicy Sausage", type: "Meat", selected: false },
      { name: "Wild Bacon", type: "Meat", selected: false },
      { name: "Hardtack", type: "Bran", selected: false },
      { name: "Snowy Rice", type: "Bran", selected: false },
      { name: "Snake Salmon", type: "Fish", selected: false },
      { name: "Tuna Head", type: "Fish", selected: false },
      { name: "Fruity Jam", type: "Fruit", selected: false },
      { name: "Northern Orange", type: "Fruit", selected: false },
      { name: "Mild Herb", type: "Veggie", selected: false },
      { name: "Sliced Cactus", type: "Veggie", selected: false },
      { name: "Spotted Onion", type: "Veggie", selected: false },
      { name: "Young Potato", type: "Veggie", selected: false },
      { name: "Aged Cheest", type: "Milk", selected: false },
      { name: "Carefree Yogurt", type: "Milk", selected: false },
      { name: "Furahiya Cola", type: "Drink", selected: false }
    ],
    meals: [
      { ingredient1: "Meat", ingredient2: "Meat", effect: "HP +20" },
      { ingredient1: "Meat", ingredient2: "Bran", effect: "Def +15" },
      { ingredient1: "Meat", ingredient2: "Fish", effect: "Nothing" },
      { ingredient1: "Meat", ingredient2: "Fruit", effect: "Fir +3" },
      { ingredient1: "Meat", ingredient2: "Veggie", effect: "Stm -25" },
      { ingredient1: "Meat", ingredient2: "Milk", effect: "HP -20" },
      { ingredient1: "Meat", ingredient2: "Drink", effect: "HP +10" },
      { ingredient1: "Bran", ingredient2: "Bran", effect: "Stm +25" },
      { ingredient1: "Bran", ingredient2: "Fish", effect: "HP +20" },
      { ingredient1: "Bran", ingredient2: "Fruit", effect: "Nothing" },
      { ingredient1: "Bran", ingredient2: "Veggie", effect: "Atk (S)" },
      { ingredient1: "Bran", ingredient2: "Milk", effect: "Nothing" },
      { ingredient1: "Bran", ingredient2: "Drink", effect: "HP +10 Thn +3" },
      { ingredient1: "Fish", ingredient2: "Fish", effect: "Atk (S)" },
      { ingredient1: "Fish", ingredient2: "Fruit", effect: "Nothing" },
      { ingredient1: "Fish", ingredient2: "Veggie", effect: "Nothing" },
      { ingredient1: "Fish", ingredient2: "Milk", effect: "Stm -25" },
      { ingredient1: "Fish", ingredient2: "Drink", effect: "Stm +25" },
      { ingredient1: "Fruit", ingredient2: "Fruit", effect: "HP -20" },
      { ingredient1: "Fruit", ingredient2: "Veggie", effect: "HP +10 Def +10" },
      { ingredient1: "Fruit", ingredient2: "Milk", effect: "Wtr +3" },
      { ingredient1: "Fruit", ingredient2: "Drink", effect: "Nothing" },
      { ingredient1: "Veggie", ingredient2: "Veggie", effect: "Def +10" },
      { ingredient1: "Veggie", ingredient2: "Milk", effect: "HP -10 Stm -25" },
      { ingredient1: "Veggie", ingredient2: "Drink", effect: "Stm +25" },
      { ingredient1: "Milk", ingredient2: "Milk", effect: "Stm +25 Atk (S)" },
      { ingredient1: "Milk", ingredient2: "Drink", effect: "Ice +3" }
    ],
  },
  {
    label: "3 Michis",
    ingredients:[
      { name: "Great Mutton", type: "Meat", selected: false },
      { name: "Juicy Rib Roast", type: "Meat", selected: false },
      { name: "Meatwagon", type: "Meat", selected: false },
      { name: "Kut Beans", type: "Bran", selected: false },
      { name: "Tasty Rice", type: "Bran", selected: false },
      { name: "Warwheat", type: "Bran", selected: false },
      { name: "Curved Shrimp", type: "Fish", selected: false },
      { name: "Horseshoe Crab", type: "Fish", selected: false },
      { name: "Spiky Blowfish", type: "Fish", selected: false },
      { name: "Frozen Apples", type: "Fruit", selected: false },
      { name: "Cudgel Onion", type: "Veggie", selected: false },
      { name: "Spicy Carrots", type: "Veggie", selected: false },
      { name: "Western Parsley", type: "Veggie", selected: false },
      { name: "Buffalo Butter", type: "Milk", selected: false },
      { name: "Chili Cheese", type: "Milk", selected: false },
      { name: "Panish", type: "Drink", selected: false }
    ],
    meals: [
      { ingredient1: "Meat", ingredient2: "Meat", effect: "HP +20" },
      { ingredient1: "Meat", ingredient2: "Bran", effect: "Nothing" },
      { ingredient1: "Meat", ingredient2: "Fish", effect: "Thn +3" },
      { ingredient1: "Meat", ingredient2: "Fruit", effect: "Atk (L)" },
      { ingredient1: "Meat", ingredient2: "Veggie", effect: "HP +10 Atk (S)" },
      { ingredient1: "Meat", ingredient2: "Milk", effect: "Nothing" },
      { ingredient1: "Meat", ingredient2: "Drink", effect: "Stm -25" },
      { ingredient1: "Bran", ingredient2: "Bran", effect: "Stm +25" },
      { ingredient1: "Bran", ingredient2: "Fish", effect: "Nothing" },
      { ingredient1: "Bran", ingredient2: "Fruit", effect: "Nothing" },
      { ingredient1: "Bran", ingredient2: "Veggie", effect: "Stm +50" },
      { ingredient1: "Bran", ingredient2: "Milk", effect: "Stm +25 Def +10" },
      { ingredient1: "Bran", ingredient2: "Drink", effect: "Def +15 Wtr +3" },
      { ingredient1: "Fish", ingredient2: "Fish", effect: "Atk (S)" },
      { ingredient1: "Fish", ingredient2: "Fruit", effect: "Stm +25 Fir +3" },
      { ingredient1: "Fish", ingredient2: "Veggie", effect: "HP -30" },
      { ingredient1: "Fish", ingredient2: "Milk", effect: "HP +30" },
      { ingredient1: "Fish", ingredient2: "Drink", effect: "Stm -25" },
      { ingredient1: "Fruit", ingredient2: "Fruit", effect: "-----------" },
      { ingredient1: "Fruit", ingredient2: "Veggie", effect: "HP -30" },
      { ingredient1: "Fruit", ingredient2: "Milk", effect: "HP -20, Stm -25" },
      { ingredient1: "Fruit", ingredient2: "Drink", effect: "Atk (S)" },
      { ingredient1: "Veggie", ingredient2: "Veggie", effect: "Def +10" },
      { ingredient1: "Veggie", ingredient2: "Milk", effect: "HP +10 Def +15" },
      { ingredient1: "Veggie", ingredient2: "Drink", effect: "Nothing" },
      { ingredient1: "Milk", ingredient2: "Milk", effect: "HP +20 Ice +3" },
      { ingredient1: "Milk", ingredient2: "Drink", effect: "Nothing" }
    ],
  },
  {
    label: "4 Michis",
    ingredients: [
      { name: "Dragon Foot", type: "Meat", selected: false },
      { name: "Gator Ribmeat", type: "Meat", selected: false },
      { name: "Princess Pork", type: "Meat", selected: false },
      { name: "Ancient Beans", type: "Bran", selected: false },
      { name: "Kokoto Rice", type: "Bran", selected: false },
      { name: "Megabagel", type: "Bran", selected: false },
      { name: "King Squid", type: "Fish", selected: false },
      { name: "Queen Shrimp", type: "Fish", selected: false },
      { name: "Pink Caviar", type: "Fish", selected: false },
      { name: "Burning Mango", type: "Fruit", selected: false },
      { name: "Lifejam", type: "Fruit", selected: false },
      { name: "Cannon Lettuce", type: "Veggie", selected: false },
      { name: "Rare Onion", type: "Veggie", selected: false },
      { name: "Scented Celery", type: "Veggie", selected: false },
      { name: "Royale Cheese", type: "Milk", selected: false },
      { name: "Blessed Wine", type: "Drink", selected: false }
    ],
    meals: [
      { ingredient1: "Meat", ingredient2: "Meat", effect: "HP +30" },
      { ingredient1: "Meat", ingredient2: "Bran", effect: "Stm -50" },
      { ingredient1: "Meat", ingredient2: "Fish", effect: "Stm +25 Wtr +5" },
      { ingredient1: "Meat", ingredient2: "Fruit", effect: "Atk (S) Fir +5" },
      { ingredient1: "Meat", ingredient2: "Veggie", effect: "Nothing" },
      { ingredient1: "Meat", ingredient2: "Milk", effect: "HP +40" },
      { ingredient1: "Meat", ingredient2: "Drink", effect: "Def +10 Ice +5" },
      { ingredient1: "Bran", ingredient2: "Bran", effect: "Stm +50" },
      { ingredient1: "Bran", ingredient2: "Fish", effect: "HP -30 Stm -25" },
      { ingredient1: "Bran", ingredient2: "Fruit", effect: "HP -40" },
      { ingredient1: "Bran", ingredient2: "Veggie", effect: "Stm +25 Atk (S)" },
      { ingredient1: "Bran", ingredient2: "Milk", effect: "HP +30 Atk (S)" },
      { ingredient1: "Bran", ingredient2: "Drink", effect: "Nothing" },
      { ingredient1: "Fish", ingredient2: "Fish", effect: "Atk (L)" },
      { ingredient1: "Fish", ingredient2: "Fruit", effect: "Def +20" },
      { ingredient1: "Fish", ingredient2: "Veggie", effect: "HP +20 Drg +3" },
      { ingredient1: "Fish", ingredient2: "Milk", effect: "Def +10 Thn +5" },
      { ingredient1: "Fish", ingredient2: "Drink", effect: "Nothing" },
      { ingredient1: "Fruit", ingredient2: "Fruit", effect: "HP +10 Atk (L)" },
      { ingredient1: "Fruit", ingredient2: "Veggie", effect: "Stm +50" },
      { ingredient1: "Fruit", ingredient2: "Milk", effect: "Nothing" },
      { ingredient1: "Fruit", ingredient2: "Drink", effect: "HP +20 Def +15" },
      { ingredient1: "Veggie", ingredient2: "Veggie", effect: "Def +15" },
      { ingredient1: "Veggie", ingredient2: "Milk", effect: "Nothing" },
      { ingredient1: "Veggie", ingredient2: "Drink", effect: "HP +40" },
      { ingredient1: "Milk", ingredient2: "Milk", effect: "-----------" },
      { ingredient1: "Milk", ingredient2: "Drink", effect: "HP +20 Stm +25" }
    ],
  },
  {
    label: "5 Michis",
    ingredients: [
      { name: "Bigmeat", type: "Meat", selected: false },
      { name: "Dragon Head", type: "Meat", selected: false },
      { name: "Dragon Tail", type: "Meat", selected: false },
      { name: "King Turkey", type: "Meat", selected: false },
      { name: "Gold Rice", type: "Bran", selected: false },
      { name: "Heaven Bread", type: "Bran", selected: false },
      { name: "Sould Beans", type: "Bran", selected: false },
      { name: "1000-Year Crab", type: "Fish", selected: false },
      { name: "Crimson Seabream", type: "Fish", selected: false },
      { name: "Hairy Tuna", type: "Fish", selected: false },
      { name: "Emerald Durian", type: "Fruit", selected: false },
      { name: "Demonshroom", type: "Veggie", selected: false },
      { name: "Fatty Tomato", type: "Veggie", selected: false },
      { name: "King Truffle", type: "Veggie", selected: false },
      { name: "Kirin Cheese", type: "Milk", selected: false },
      { name: "Goldenfish Brew", type: "Drink", selected: false }
    ],
    meals: [
      { ingredient1: "Meat", ingredient2: "Meat", effect: "HP +30" },
      { ingredient1: "Meat", ingredient2: "Bran", effect: "Nothing" },
      { ingredient1: "Meat", ingredient2: "Fish", effect: "HP +20 Stm +50" },
      { ingredient1: "Meat", ingredient2: "Fruit", effect: "HP -40 Stm -25" },
      { ingredient1: "Meat", ingredient2: "Veggie", effect: "HP +40 Atk (L)" },
      { ingredient1: "Meat", ingredient2: "Milk", effect: "Stm +25 Def +15" },
      { ingredient1: "Meat", ingredient2: "Drink", effect: "Atk (S) Fir +5" },
      { ingredient1: "Bran", ingredient2: "Bran", effect: "Stm +50" },
      { ingredient1: "Bran", ingredient2: "Fish", effect: "HP +40 Def +20" },
      { ingredient1: "Bran", ingredient2: "Fruit", effect: "HP +30 Stm +25" },
      { ingredient1: "Bran", ingredient2: "Veggie", effect: "Stm +25 Atk (S)" },
      { ingredient1: "Bran", ingredient2: "Milk", effect: "HP -50" },
      { ingredient1: "Bran", ingredient2: "Drink", effect: "HP +20 Wtr +20" },
      { ingredient1: "Fish", ingredient2: "Fish", effect: "Atk (L)" },
      { ingredient1: "Fish", ingredient2: "Fruit", effect: "Stm +50 Def +10" },
      { ingredient1: "Fish", ingredient2: "Veggie", effect: "Def +10 Ice +5" },
      { ingredient1: "Fish", ingredient2: "Milk", effect: "Nothing" },
      { ingredient1: "Fish", ingredient2: "Drink", effect: "Nothing" },
      { ingredient1: "Fruit", ingredient2: "Fruit", effect: "-----------" },
      { ingredient1: "Fruit", ingredient2: "Veggie", effect: "Nothing" },
      { ingredient1: "Fruit", ingredient2: "Milk", effect: "HP +50 Drg +5" },
      { ingredient1: "Fruit", ingredient2: "Drink", effect: "Atk (S) Thn 5" },
      { ingredient1: "Veggie", ingredient2: "Veggie", effect: "Def +15" },
      { ingredient1: "Veggie", ingredient2: "Milk", effect: "Stm +25 Def +20" },
      { ingredient1: "Veggie", ingredient2: "Drink", effect: "Stm -50" },
      { ingredient1: "Milk", ingredient2: "Milk", effect: "-----------" },
      { ingredient1: "Milk", ingredient2: "Drink", effect: "HP +50 Stm +50" }
    ],
  },
];

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

  function getMatchingIngredients(meal) {
    const matches = selectedIngredients.filter(
      (ing) =>
        ing.type === meal.ingredient1 || ing.type === meal.ingredient2
    );
    return matches.map((ing) => ing.name).join(", ");
  }

  return (
    <div>
      {/* Pestañas */}
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        {tabData.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            style={{
              padding: "10px 15px",
              backgroundColor: tabIndex === index ? "#ccc" : "#eee",
              border: "1px solid #999",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="flex-container" style={{ padding: 20 }}>
        <div className="tabla">
          <h2>Ingredientes</h2>
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ing, i) => (
                <tr key={ing.name}>
                  <td>{ing.name}</td>
                  <td>{ing.type}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={ing.selected}
                      onChange={() => toggleIngredient(i)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tabla">
          <h2>Comidas posibles</h2>
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>Ingrediente 1</th>
                <th>Ingrediente 2</th>
                <th>Efecto</th>
                <th>Ingredientes usados</th>
              </tr>
            </thead>
            <tbody>
              {mealsData.filter(canMakeMeal).map((meal, i) => (
                <tr key={i} style={{ backgroundColor: "lightgreen" }}>
                  <td>{meal.ingredient1}</td>
                  <td>{meal.ingredient2}</td>
                  <td>{meal.effect}</td>
                  <td>{getMatchingIngredients(meal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}