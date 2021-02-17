("use strict");
const express = require("express"),
  router = express.Router(),
  userContoller = require("../controllers/user"),
  auth = require("../middlewares/auth");

module.exports = app => {
  // For testing routing functionality
  router.get("/test", function(req, res) {
    res.send("Hello World!");
  });

  /**
   * @method POST
   * @params input {object}
   * @description this router used to validate admin user, In case of success generating token key.
   * @returns In case of success, Status code 200 with output {object},  else  Error: output {object} with respective error code
   */
  router.post("/user/auth", userContoller.userAuth);

  /**
   * @method POST
   * @params input {object}
   * @description Insert new document details in user collcetion
   * @returns In case of success, Status code 200 with output {object},  else  Error: output {object} with respective error code
   */
  router.post("/users/create", auth, userContoller.createNewUser);

  /**
   * @method GET
   * @description find all user details from user collection
   * @returns In case of success, Status code 200 with output {object},  else  Error: output {object} with respective error code
   */
  router.get("/users/allusers", auth, userContoller.getAllUser);

  /**
   * @method GET
   * @description Get a single user by id
   * @params input user _id
   * @returns In case of success, Status code 200 with output array of {object},  else  Error: output {object} with respective error code
   */
  router.get("/user/getuser/:id?", auth, userContoller.getSingleUser);

  /**
   * @method PUT
   * @description Update the userdetails by id
   * @params input user _id and update {object}
   * @returns In case of success, Status code 200 with success message,  else  Error: output {object} with respective error code
   */
  router.put("/user/update/:id?", auth, userContoller.updateUser);

  /**
   * @method DELETE
   * @params input user _id
   * @description delete  user details from user collection by user _id
   * @returns In case of success, Status code 200 with output {object},  else  Error: output {object} with respective error code
   */
  router.delete("/users/removeUser/:userId", auth, userContoller.deleteUser);

  // Default route
  app.use("/", router);
};
