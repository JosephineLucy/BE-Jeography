const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");

afterAll(() => {
  if (db.client.close) db.client.close();
});

describe("/students", () => {
  describe("GET /students", () => {
    test("status 200: returns an array of students", () => {
      return request(app)
        .get("/students")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
        });
    });
  });
});

describe("/:country", () => {
  describe("GET /:country", () => {
    test("status 200: returns an array of the questions for a specific country", () => {
      return request(app)
        .get("/englandDB")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
        });
    });
  });
});

describe('/student', () => {
  describe('POST /student', () => {
    test('status 201: responds with a body of a posted student', () => {
      const studentToPost = {
        username:'Jamie',
        password:'letsHope123',
        email: 'jamiete@gmail.com'
      };

      return request(app)
      .post('/student')
      .send(studentToPost)
      .expect(201)
      .then(({body}) => {
        expect(body.student).toEqual({acknowledged: true, insertedId: expect.any(String)})
      
      });
    });
  });
});