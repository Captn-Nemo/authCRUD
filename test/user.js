const request = require("supertest");
const expect = require("chai").expect;

/*let { helloword } = require('../testFunctions');
const testFunctions = require('../testFunctions');
helloword = testFunctions.helloword();*/
const server = require("../index");
var app = request.agent(server);
var token = "",
  rand = Math.floor(Math.random() * Math.floor(99999));

/*describe("Test functions", function(){
    describe("helloWorld()", function(){
       it("Result should be return Hi shankar", function(){
           expect(helloword).to.equal("Hi shankar");
       });   
    });
});*/
describe("API Test:", function() {
  //Test cases for Auth
  describe("POST /user/auth Get admin user token check", function() {
    it("Check admin login and generate Token", function(done) {
      app
        .post("/user/auth")
        .send({ username: "admin@example.com", password: "admin@123" })
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.success).to.equal(true);
          expect(res.body).to.be.an("object");
          token = res.body.data.token;
          done();
        });
    });
  });
  //Test cases for create users
  describe("POST /user/create Adding new user check", function() {
    it("With valid inputs params", function(done) {
      app
        .post("/users/create")
        .set("Authorization", `${token}`)
        .send({
          email: "SajithTesting" + rand + "@gmail.com",
          password: "123456789"
        })
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.success).to.equal(true);
          expect(res.body).to.be.an("object");
          done();
        });
    });
    it("With invalid inputs params", function(done) {
      app
        .post("/users/create")
        .set("Authorization", `${token}`)
        .send({ email: "", password: "1234567" })
        .end((err, res) => {
          expect(res.status).to.eql(422);
          expect(res.body.success).to.equal(false);
          expect(res.body).to.be.an("object");
          done();
        });
    });
    it("With existing user inputs params", function(done) {
      app
        .post("/users/create")
        .set("Authorization", `${token}`)
        .send({ email: "sajith@gmail.com", password: "1234567" })
        .end((err, res) => {
          expect(res.status).to.eql(409);
          expect(res.body.success).to.equal(false);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });

  // Test cases for get all users
  describe("GET /users Get allUsers check", function() {
    it("Should get allusers", function(done) {
      app
        .get("/users/allusers")
        .set("Authorization", `${token}`)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.success).to.equal(true);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });

  //Test cases For a Single User
  describe("GET /user/getuser Get user by id", function() {
    it("Should get The Requested User", function(done) {
      app
        .get("/user/getuser/602d444bb92e49322c425a89")
        .set("Authorization", `${token}`)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.success).to.equal(true);
          expect(res.body).to.be.an("object");
          done();
        });
    });

    it("Should Return 404 if user not found", function(done) {
      app
        .get("/user/getuser/602d444bb92e49322c425a85")
        .set("Authorization", `${token}`)
        .end((err, res) => {
          expect(res.status).to.eql(404);
          expect(res.body.success).to.equal(false);
          expect(res.body).to.be.an("object");
          done();
        });
    });
    it("Should Return 412 if no id is provided", function(done) {
      app
        .get("/user/getuser/")
        .set("Authorization", `${token}`)
        .end((err, res) => {
          expect(res.status).to.eql(422);
          expect(res.body.success).to.equal(false);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });

  //Test cases For a Udating a  User
  describe("PUT /user/update Update user by id", function() {
    it("Should Update the address , mobile, pincode of the The passed User", function(done) {
      app
        .put("/user/update/602d62aa3c5fee2b14e3b191")
        .set("Authorization", `${token}`)
        .send({
          address: "dummyaddress",
          mobile: "875443356",
          pincode: "123456"
        })
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.success).to.equal(true);
          expect(res.body).to.be.an("object");
          done();
        });
    });

    it("Should Return 404 if user not found", function(done) {
      app
        .put("/user/update/602d62aa3c5fee2b14e3b190")
        .set("Authorization", `${token}`)
        .send({
          address: "dummy address",
          mobile: "8754433",
          pincode: "123456"
        })
        .end((err, res) => {
          expect(res.status).to.eql(404);
          expect(res.body.success).to.equal(false);
          expect(res.body).to.be.an("object");
          done();
        });
    });
    it("Should Return 412 if parameters missing", function(done) {
      app
        .put("/user/update/602d62aa3c5fee2b14e3b191")
        .set("Authorization", `${token}`)
        .send({
          address: "dummy address",
          pincode: "123456"
        })
        .end((err, res) => {
          expect(res.status).to.eql(422);
          expect(res.body.success).to.equal(false);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });

  //test cases for remove user
  describe("DELETE /users/removeUser/:userId check", function() {
    //   it("Should delete users", function(done) {
    //     app
    //       .delete("/users/removeUser/602ba7a1310c7e3a90585f4c")
    //       .set("Authorization", `${token}`)
    //       .end((err, res) => {
    //         expect(res.status).to.eql(200);
    //         expect(res.body.success).to.equal(true);
    //         expect(res.body).to.be.an("object");
    //         done();
    //       });
    //   });
    it("Error checking while deleting invalid user", function(done) {
      app
        .delete("/users/removeUser/12301")
        .set("Authorization", `${token}`)
        .end((err, res) => {
          expect(res.status).to.eql(500);
          expect(res.body.success).to.equal(false);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });
  //other test cases  here
});
