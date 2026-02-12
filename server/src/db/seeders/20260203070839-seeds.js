"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "anna@cook.ru",
          password: "TestPass1!", // 123456
          username: "Анна Иванова",
        },
        {
          email: "petr@cook.ru",
          password: "TestPass1!", // 123456
          username: "Петр Сидоров",
        },
        {
          email: "maria@cook.ru",
          password: "TestPass1!", // 123456
          username: "Мария Петрова",
        },
        {
          email: "ivan@cook.ru",
          password: "TestPass1!", // 123456
          username: "Иван Смирнов",
        },
        {
          email: "elena@cook.ru",
          password: "TestPass1!", // 123456
          username: "Елена Васильева",
        },
        {
          email: "dmitry@cook.ru",
          password: "TestPass1!", // 123456
          username: "Дмитрий Козлов",
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      "Recipe",
      [
        {
          title: "Борщ",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwSqkL1oFMO9Ahk_D8zf_9ofthTcF-68RBxA&s",
          time: 90,
          ingredients:
            "свекла 2шт, картофель 3шт, капуста 300г, морковь 1шт, лук 1шт, томатная паста 2ст.л, чеснок 2зубчика, сметана для подачи",
          instructions:
            "1. Сварить бульон из говядины. 2. Нарезать овощи. 3. Пассеровать свеклу с томатной пастой. 4. Добавить картофель в бульон через 20мин. 5. Добавить капусту и зажарку. 6. Варить 15мин. 7. Добавить чеснок, зелень. 8. Подавать со сметаной.",
          user_id: 1,
        },
        {
          title: "Паста Карбонара",
          image:
            "https://img.iamcook.ru/old/upl/recipes/cat/u-7a1b3a5f41e8f851b38f5611c5837796.JPG",
          time: 20,
          ingredients:
            "спагетти 250г, яйца 2шт, бекон 100г, сыр пармезан 50г, черный перец, соль",
          instructions:
            "1. Сварить спагетти. 2. Обжарить бекон. 3. Смешать яйца с тертым сыром. 4. Слить пасту, добавить бекон. 5. Влить яичную смесь, быстро перемешать. 6. Посыпать перцем и сыром.",
          user_id: 1,
        },
        {
          title: "Куриный суп с лапшой",
          image:
            "https://img.iamcook.ru/2022/upl/recipes/zen/u-6b08b7a7c21c071e29417ca146cbd867.JPG",
          time: 45,
          ingredients:
            "курица 500г, морковь 1шт, лук 1шт, картофель 3шт, лапша 100г, зелень, соль, перец",
          instructions:
            "1. Сварить куриный бульон. 2. Добавить нарезанный картофель. 3. Сделать зажарку из лука и моркови. 4. Добавить лапшу за 5 минут до готовности. 5. Посыпать зеленью.",
          user_id: 1,
        },

        {
          title: "Цезарь с курицей",
          image:
            "https://cdn.vkuso.ru/uploads/u25089_e75a8c73c127f04467cb38761c40b8a0.jpg",
          time: 30,
          ingredients:
            "куриное филе 300г, салат романо, помидоры черри 100г, пармезан 50г, сухарики, соус цезарь",
          instructions:
            "1. Обжарить курицу. 2. Порвать салат руками. 3. Разрезать помидоры. 4. Смешать все ингредиенты. 5. Заправить соусом. 6. Посыпать сухариками и сыром.",
          user_id: 2,
        },
        {
          title: "Греческий салат",
          image:
            "https://www.russianfood.com/dycontent/images_upl/557/big_556060.jpg",
          time: 15,
          ingredients:
            "огурцы 2шт, помидоры 2шт, перец 1шт, красный лук, фета 200г, маслины, оливковое масло, орегано",
          instructions:
            "1. Нарезать овощи крупными кусками. 2. Добавить маслины. 3. Сверху выложить кубики феты. 4. Полить маслом, посыпать орегано.",
          user_id: 2,
        },
        {
          title: "Стейк из говядины",
          image:
            "https://halal-spb.ru/sites/default/files/styles/large/public/bd09da8cd90c4f5f8807f24785545d00.jpg?itok=KnyHC-n8",
          time: 25,
          ingredients:
            "говядина 400г, соль, перец, розмарин, чеснок, сливочное масло",
          instructions:
            "1. Мясо комнатной температуры. 2. Обсушить, посолить, поперчить. 3. Обжарить по 3-4 минуты с каждой стороны. 4. Добавить масло, чеснок, розмарин. 5. Поливать мясо маслом. 6. Завернуть в фольгу на 5 минут.",
          user_id: 2,
        },

        {
          title: "Шарлотка яблочная",
          image:
            "https://greenleaf.com.ua/wp-content/uploads/2021/11/recept_6720_vicv.jpeg",
          time: 50,
          ingredients:
            "яйца 4шт, сахар 1стакан, мука 1стакан, яблоки 3шт, ванилин, корица",
          instructions:
            "1. Взбить яйца с сахаром. 2. Добавить муку, ванилин. 3. Нарезать яблоки. 4. Выложить яблоки в форму, залить тестом. 5. Выпекать 40мин при 180°.",
          user_id: 3,
        },
        {
          title: "Оливье классический",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSATOvpqqooAPm6uNQDb-utNGDJ_SRs8GRC8g&s",
          time: 40,
          ingredients:
            "картофель 4шт, яйца 4шт, колбаса 300г, горошек 1банка, морковь 2шт, майонез, соль",
          instructions:
            "1. Отварить картофель, яйца, морковь. 2. Нарезать кубиками. 3. Смешать все ингредиенты. 4. Заправить майонезом.",
          user_id: 3,
        },
        {
          title: "Сырники",
          image:
            "https://topfood.club/assets/components/phpthumbof/cache/2024-07-01-k6g8om-syirniki-iz-tvoroga.2ceee6ffad271e3be1f7409fa7a41c20.jpg",
          time: 25,
          ingredients:
            "творог 400г, яйцо 1шт, мука 4ст.л, сахар 2ст.л, ванилин, соль",
          instructions:
            "1. Смешать творог, яйцо, сахар, муку. 2. Сформировать сырники. 3. Обжарить с двух сторон. 4. Подавать со сметаной.",
          user_id: 3,
        },

        {
          title: "Плов",
          image:
            "https://images.gastronom.ru/aovMYcGLbHtuJwEZdn2yUPxww-dA-zfM3dexGT3u-JY/pr:content-group-preview-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2U3ODk0OGExLWE0ZjQtNGRjNS1hZjNiLTQ2MmNhMmY5ODgyNi5qcGc.webp",
          time: 120,
          ingredients:
            "баранина 500г, рис 300г, морковь 2шт, лук 2шт, чеснок, зира, куркума, масло",
          instructions:
            "1. Обжарить мясо. 2. Добавить лук, морковь. 3. Всыпать рис, залить водой. 4. Добавить специи, чеснок. 5. Тушить 40мин.",
          user_id: 4,
        },
        {
          title: "Лагман",
          image:
            "https://images.gastronom.ru/0zVqZ6KzTj6HTZM2bIxWIzMYdvLSCkEQS2BslFBANxg/pr:article-preview-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2VjMDE3MjJhLTFhNjEtNDg1NC04YTcxLTM2OGZiNDUxZTA3ZS5qcGc.webp",
          time: 60,
          ingredients:
            "говядина 400г, лапша, перец, лук, морковь, помидоры, чеснок, зелень",
          instructions:
            "1. Обжарить мясо. 2. Добавить овощи, тушить. 3. Сварить лапшу. 4. Соединить, посыпать зеленью.",
          user_id: 4,
        },

        {
          title: "Тирамису",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLGF312p7V0rS3kxL8U76QvSlNLbHxx5hbA&s",
          time: 30,
          ingredients:
            "маскарпоне 500г, савоярди 200г, яйца 4шт, сахар, кофе, какао",
          instructions:
            "1. Взбить желтки с сахаром, добавить сыр. 2. Взбить белки. 3. Смешать. 4. Обмакивать печенье в кофе. 5. Выкладывать слои. 6. Убрать в холодильник на 4 часа. 7. Посыпать какао.",
          user_id: 5,
        },
        {
          title: "Наполеон",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBySzyUJ2eSv1mB_no-yCucAA4MSt8831slQ&s",
          time: 120,
          ingredients:
            "тесто слоеное 500г, молоко 1л, яйца 4шт, мука 100г, сахар 200г, масло 100г",
          instructions:
            "1. Испечь коржи. 2. Сварить заварной крем. 3. Промазать коржи. 4. Дать пропитаться 6 часов.",
          user_id: 5,
        },

        {
          title: "Бургер",
          image:
            "https://img.povar.ru/mobile/97/c1/ba/f7/burger_cezar-635278.jpg",
          time: 35,
          ingredients:
            "булочки 2шт, фарш 300г, сыр, салат, помидор, лук, соленые огурцы, соус",
          instructions:
            "1. Сделать котлеты. 2. Обжарить. 3. Подрумянить булочки. 4. Собрать бургер: соус, салат, котлета, сыр, огурцы, лук, помидор.",
          user_id: 6,
        },
        {
          title: "Картошка фри",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNQn5eE3vcbN4UCcnfB76mjK1xjsIdbom5Rg&s",
          time: 30,
          ingredients: "картофель 500г, масло, соль, специи",
          instructions:
            "1. Нарезать картофель брусочками. 2. Обсушить. 3. Обжарить во фритюре. 4. Посолить.",
          user_id: 6,
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      "Favorrites",
      [
        { user_id: 1, recipe_id: 4 },
        { user_id: 1, recipe_id: 7 },
        { user_id: 1, recipe_id: 10 },
        { user_id: 1, recipe_id: 13 },

        { user_id: 2, recipe_id: 1 },
        { user_id: 2, recipe_id: 2 },
        { user_id: 2, recipe_id: 8 },
        { user_id: 2, recipe_id: 15 },

        { user_id: 3, recipe_id: 2 },
        { user_id: 3, recipe_id: 5 },
        { user_id: 3, recipe_id: 9 },
        { user_id: 3, recipe_id: 14 },

        { user_id: 4, recipe_id: 1 },
        { user_id: 4, recipe_id: 6 },
        { user_id: 4, recipe_id: 7 },
        { user_id: 4, recipe_id: 13 },

        { user_id: 5, recipe_id: 2 },
        { user_id: 5, recipe_id: 3 },
        { user_id: 5, recipe_id: 9 },
        { user_id: 5, recipe_id: 11 },

        { user_id: 6, recipe_id: 4 },
        { user_id: 6, recipe_id: 6 },
        { user_id: 6, recipe_id: 12 },
        { user_id: 6, recipe_id: 13 },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Recipe", null, {});
  },
};
