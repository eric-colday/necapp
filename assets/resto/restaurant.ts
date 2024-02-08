export const getDishById = (id: number) => {
  const meals = restaurant.food.flatMap((category) => category.meals);
  return meals.find((meal) => meal.id === id);
};
export const restaurant = {
  food: [
    {
      category: 'Meal Deals',
      meals: [
        {
          id: 1,
          name: 'Pasta Power ✊',
          price: 17,
          info: 'Comprend un pain à l\'ail, des pâtes et une boisson gazeuse.',
          img: require('@/assets/resto/1.png'),
        },
        {
          id: 2,
          name: 'Vegetariano 💚',
          price: 17,
          info: 'Comprend un pain à l\'ail, des pâtes végétariennes et une boisson gazeuse',
          img: require('@/assets/resto/2.png'),
        },
        {
          id: 3,
          name: 'Vaps Date 💕',
          price: 40,
          info: 'Comprend un pain à l\'ail avec ou sans fromage, un choix de deux pizzas, une bouteille de vin ou quatre bouteilles de Moretti',
          img: require('@/assets/resto/3.png'),
        },
        {
          id: 4,
          name: "Livin' your best life 😎",
          price: 80,
          info: 'Comprend deux pains à l\'ail avec ou sans fromage, quatre pizzas, deux bouteilles de vin ou huit bouteilles de bière ou un mélange des deux',
          img: require('@/assets/resto/4.png'),
        },
      ],
    },
    {
      category: 'Pasta',
      meals: [
        {
          id: 5,
          name: 'Arrabbiata',
          price: 9.35,
          info: 'Sauce tomate, piment, ail et oignons',
          img: require('@/assets/resto/5.png'),
        },
        {
          id: 6,
          name: 'Pomodoro e Mozzarella',
          price: 10.75,
          info: 'Sauce tomate, oignons, mozzarella',
          img: require('@/assets/resto/6.png'),
        },
      ],
    },
    {
      category: 'Pizza',
      meals: [
        {
          id: 7,
          name: 'Salame',
          price: 11.35,
          info: 'Saucisse italienne épicée, sauce tomate, mozzarella',
          img: require('@/assets/resto/7.png'),
        },
        {
          id: 8,
          name: 'Margherity',
          price: 9.75,
          info: 'Sauce tomate, mozzarella',
          img: require('@/assets/resto/8.png'),
        },
      ],
    },
    {
      category: 'Salad',
      meals: [
        {
          id: 9,
          name: 'Insalata Mista Piccola',
          price: 5.99,
          info: 'Salade composée, tomates cerises et carottes râpées. Il ne peut y avoir d\'échange, si vous souhaitez ajouter des extras, veuillez les personnaliser ci-dessous.',
          img: require('@/assets/resto/9.png'),
        },
        {
          id: 10,
          name: 'Insalata Mista della Casa',
          price: 8.95,
          info: 'Grande salade composée. Il ne peut y avoir d\'échange, si vous souhaitez ajouter des extras, veuillez les personnaliser ci-dessous.',
          img: require('@/assets/resto/10.png'),
        },
      ],
    },
  ],
};
