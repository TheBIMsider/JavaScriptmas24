// Requirements for a suitable recipe
// 1: Contains at least one ingredient Alice likes
// 2: Contains zero ingredients that Alice dislikes

// Step 1: Filter recipes based on Alice's preferences

// Step 2: Output the suitable recipes

// Guests and their preferences
const guests = {
  alice: {
    name: 'Alice',
    loves: ['avocado', 'quinoa', 'kale'],
    dislikes: [
      'pork',
      'chicken',
      'turkey',
      'beef',
      'dairy',
      'butter',
      'eggs',
      'gluten',
      'nuts',
      'soy',
      'flour',
    ],
    reminders: [
      'Alice follows a plant-based diet',
      "She's allergic to gluten",
      "She can't have any dairy products",
      'She loves when you make dishes with avocado',
    ],
  },
  bob: {
    name: 'Bob',
    loves: ['beef', 'chicken', 'eggs'],
    dislikes: ['mushrooms', 'tofu', 'kale', 'quinoa', 'avocado'],
    reminders: [
      'Bob prefers traditional meat dishes',
      "He doesn't like most vegetarian ingredients",
      'He especially enjoys your chicken recipes',
      "He's not fond of trendy health foods",
    ],
  },
  carol: {
    name: 'Carol',
    loves: ['mushrooms', 'bell peppers', 'lentils'],
    dislikes: ['meat', 'eggs', 'dairy'],
    reminders: [
      'Carol is vegetarian',
      "She can't have any dairy products",
      'She loves your mushroom dishes',
      'She really enjoys lentil-based meals',
    ],
  },
};

// List of recipes with their ingredients
const recipes = [
  {
    name: 'Honey-Glazed Ham',
    ingredients: ['pork', 'honey', 'brown sugar', 'cloves', 'butter'],
  },
  {
    name: 'Roast Turkey with Stuffing',
    ingredients: [
      'turkey',
      'bread crumbs',
      'gluten',
      'celery',
      'onions',
      'tomatoes',
      'butter',
    ],
  },
  {
    name: 'Classic Beef Wellington',
    ingredients: ['beef', 'mushrooms', 'puff pastry', 'eggs'],
  },
  {
    name: 'Gingerbread Cookies',
    ingredients: ['flour', 'molasses', 'ginger', 'cinnamon', 'butter', 'eggs'],
  },
  {
    name: 'Vegan Stuffed Peppers',
    ingredients: [
      'bell peppers',
      'quinoa',
      'black beans',
      'corn',
      'tomato sauce',
      'kale',
    ],
  },
  {
    name: 'Roasted Brussels Sprouts',
    ingredients: ['brussels sprouts', 'olive oil', 'garlic'],
  },
  {
    name: 'Vegan Avocado Chocolate Mousse',
    ingredients: ['avocado', 'cocoa powder', 'maple syrup', 'flour'],
  },
  {
    name: 'Vegan Christmas Cookies',
    ingredients: ['oats', 'maple syrup', 'vanilla extract'],
  },
  {
    name: 'Quinoa Salad',
    ingredients: ['kale', 'quinoa', 'cranberries', 'lemon juice'],
  },
  {
    name: 'Vegan Lentil Loaf',
    ingredients: ['lentils', 'carrots', 'celery', 'onions', 'tomato paste'],
  },
];

function App() {
  const [selectedGuest, setSelectedGuest] = React.useState(null);
  const [showReminders, setShowReminders] = React.useState(false);
  const [showRejected, setShowRejected] = React.useState(false);

  // Check if a recipe is suitable for the selected guest
  const isSuitableRecipe = (recipe) => {
    if (!selectedGuest) return false;
    const guest = guests[selectedGuest];

    // Check if recipe contains any disliked ingredients
    const hasDislikedIngredients = recipe.ingredients.some((ingredient) =>
      guest.dislikes.includes(ingredient)
    );
    if (hasDislikedIngredients) return false;

    // Check if recipe contains at least one loved ingredient
    const hasLovedIngredients = recipe.ingredients.some((ingredient) =>
      guest.loves.includes(ingredient)
    );
    return hasLovedIngredients;
  };

  // Handle guest selection
  const handleGuestSelect = (guestId) => {
    setSelectedGuest(guestId);
    setShowRejected(false);
    setShowReminders(false);
  };

  // Filter recipes based on suitability
  const suitableRecipes = recipes.filter(isSuitableRecipe);
  const rejectedRecipes = recipes.filter((recipe) => !isSuitableRecipe(recipe));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Grandma's Recipe Helper</h1>

      {!selectedGuest ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Who's coming to dinner?
          </h2>
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {Object.keys(guests).map((guestId) => (
              <button
                key={guestId}
                onClick={() => handleGuestSelect(guestId)}
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {guests[guestId].name}
              </button>
            ))}
          </div>
          <div className="grandma-image">
            <img
              src="grandma.jpg"
              alt="Grandma cooking"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={() => {
                setSelectedGuest(null);
                setShowReminders(false);
                setShowRejected(false);
              }}
              className="text-blue-600 underline"
            >
              ← Pick Different Guest
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setShowReminders(!showReminders)}
                className="px-4 py-2 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                {showReminders ? 'Hide' : 'Show'} Food Reminders
              </button>
              <button
                onClick={() => setShowRejected(!showRejected)}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Show {showRejected ? 'Accepted' : 'Rejected'} Recipes
              </button>
            </div>
          </div>

          {showReminders && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-medium mb-2">
                Remember for {guests[selectedGuest].name}:
              </h3>
              <ul className="list-disc pl-5">
                {guests[selectedGuest].reminders.map((reminder) => (
                  <li key={reminder} className="text-yellow-800">
                    {reminder}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="recipe-preferences">
            <div className="preference-card loves">
              <h3 className="font-medium mb-2">
                {guests[selectedGuest].name} Loves ❤️
              </h3>
              <ul className="list-disc pl-5">
                {guests[selectedGuest].loves.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="preference-card dislikes">
              <h3 className="font-medium mb-2">
                {guests[selectedGuest].name} Dislikes ⛔
              </h3>
              <ul className="list-disc pl-5">
                {guests[selectedGuest].dislikes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              {showRejected ? 'Rejected' : 'Accepted'} Recipes
            </h2>
            {(showRejected ? rejectedRecipes : suitableRecipes).map(
              (recipe) => (
                <div
                  key={recipe.name}
                  className={`recipe-card ${showRejected ? '' : 'suitable'}`}
                >
                  <h3 className="recipe-title">
                    {recipe.name} {showRejected ? '❌' : '✅'}
                  </h3>
                  <p className="ingredient-list">
                    Ingredients: {recipe.ingredients.join(', ')}
                  </p>
                </div>
              )
            )}
            {(showRejected ? rejectedRecipes : suitableRecipes).length ===
              0 && (
              <p className="text-gray-500 italic">
                No {showRejected ? 'rejected' : 'accepted'} recipes found.
              </p>
            )}
          </div>

          <div className="summary-card">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p>
              Found {suitableRecipes.length} suitable recipes out of{' '}
              {recipes.length} total recipes for {guests[selectedGuest].name}.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// Updated React 18 rendering
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
