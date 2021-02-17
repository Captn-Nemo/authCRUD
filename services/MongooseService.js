class MongooseService {
  /**
   * @description Create an instance of the MongooseService class
   * @param Model {mongoose.model} Mongoose Model to use for the instance
   */
  constructor(Model) {
    this.model = Model;
  }

  /**
   * @description Create a new document on the Model
   * @param pipeline {array} Aggregate pipeline to execute
   * @returns {Promise} Returns the results of the query
   */
  aggregate(pipeline) {
    return this.model.aggregate(pipeline).exec();
  }

  /**
   * @description Create a new document on the Model
   * @param body {object} Body object to create the new document with
   * @returns {Promise} Returns the results of the query
   */
  create(body) {
    return this.model.create(body);
  }

  /**
   * @description Count the number of documents matching the query criteria
   * @param query {object} Query to be performed on the Model
   * @returns {Promise} Returns the results of the query
   */
  count(query) {
    return this.model.countDocuments(query).exec();
  }

  /**
   * @description Delete an existing document on the Model
   * @param id {string} ID for the object to delete
   * @returns {Promise} Returns the results of the query
   */
  delete(id) {
    return this.model.findByIdAndDelete(id).exec();
  }

  update(id, body) {
    return this.model.updateOne({ _id: id }, body).exec();
  }
  /**
   * @description Retrieve multiple documents from the Model with the provided
   *   query
   * @param query {object} - Query to be performed on the Model
   * @param {object} [projection] Optional: Fields to return or not return from
   * query
   * @param {object} [sort] - Optional argument to sort data
   * @param {object} [options] Optional options to provide query
   * @returns {Promise} Returns the results of the query
   */
  find(
    query,
    projection = { __v: 0 },
    sort = { id: 1 },
    options = { lean: true }
  ) {
    return this.model
      .find(query, projection, options)
      .sort(sort)
      .select(projection)
      .exec();
  }
}

module.exports = MongooseService;
