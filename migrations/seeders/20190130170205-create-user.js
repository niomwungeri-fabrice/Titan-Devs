"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: "dfe7fbc2-289d-11e9-b210-d663bd873d97",
          email: "test@ah.com",
          password: "password",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> [ft-user-signup-#163756426]Add test for  and attributes validation
          username: "luc",
=======
          firstName: "User",
          lastName: "1",
>>>>>>> [ft-user-signup-#163756426]Add test for  and attributes validation
<<<<<<< HEAD
=======
          username: "luc",
>>>>>>> #163756426 Add eslint-plugin-jsdoc@latest
=======
>>>>>>> [ft-user-signup-#163756426]Add test for  and attributes validation
          createdAt: "2019-02-04T14:17:44.366Z",
          updatedAt: "2019-02-04T14:17:44.366Z"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
