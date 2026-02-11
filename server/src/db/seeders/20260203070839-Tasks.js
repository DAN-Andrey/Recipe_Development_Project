'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'Test',
          email: 'test@example.com',
          password: 'SecurePass123!',
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          title: 'Покормить собаку',
          text: 'Собака ест меня',
          user_id: 1,
        },
        {
          title: 'Написать приложение',
          text: 'Выйти на IPO',
          user_id: 1,
        },
        {
          title: 'Выучить программирование',
          text: 'Стать долларовым миллионером',
          user_id: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  },
};
