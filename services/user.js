//Services
const MongooseService = require("./MongooseService");

class users {
  /**
   * @description Initializes a new instance of the user
   * @param UserModel {mongoose.model} Required: Instance of Mongoose model
   */
  constructor(UserModel) {
    this.UserModel = UserModel;
    this.mongooseServiceInstance = new MongooseService(this.UserModel);
  }

  /**
   * @description creating new user document in user collection
   * @param {String} object
   * @returns {Promise} Returns result of Mongoose query
   */
  async createNewUser(body) {
    //console.log("Inside service=======>", body);
    try {
      const Exist = await this.mongooseServiceInstance.count({
        email: body.email
      });
      if (Exist > 0) return "Exist";
      const data = await this.mongooseServiceInstance.create(body);
      // console.log("Inside service=======>", data);
      return data;
    } catch (err) {
      // console.log("Inside service err=======>", err);
      throw err;
    }
  }
  async updateUser(body, id) {
    //console.log("Inside service=======>", body);
    try {
      const Exist = await this.mongooseServiceInstance.count({
        _id: id
      });

      if (Exist > 0) {
        const data = await this.mongooseServiceInstance.update(id, body);
        // console.log("Inside service=======>", data);
        return data;
      } else if (Exist <= 0) return "Not Found";
    } catch (err) {
      // console.log("Inside service err=======>", err);
      throw err;
    }
  }

  /**
   * @description SELECT (*)  users details from user collection
   * @param {String} object
   * @returns {Promise} Returns result of Mongoose query
   */
  async getAllUser() {
    //console.log("Inside service=======> getAlluserInfo");
    try {
      const data = await this.mongooseServiceInstance.find();
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getUser(id) {
    //console.log("Inside service=======> getAlluserInfo");
    try {
      const data = await this.mongooseServiceInstance.find({ _id: id });
      return data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description DELETE new user document in user collection
   * @param {String} object
   * @returns {Promise} Returns result of Mongoose query
   */
  async deleteUser(userId) {
    //console.log("Inside service input deleteuserByID=======> ", userId);
    try {
      const data = await this.mongooseServiceInstance.delete(userId);
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = users;
