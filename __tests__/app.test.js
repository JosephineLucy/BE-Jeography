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
          body.students.forEach((student) => {
            expect.objectContaining({
              _id: expect.any(String),
              type: expect.any(String),
              avatar_id: expect.any(String),
              username: expect.any(String),
              password: expect.any(String),
              email: expect.any(String),
              userPoints: expect.any(Number),
              jeoRanch: expect.any(Array),
              userStatus: expect.any(String),
            });
          });
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
          expect(body.selectedCountry).toHaveLength(5);
          body.selectedCountry.forEach((question) => {
            expect.objectContaining({
              _id: expect.any(String),
              country: expect.any(String),
              question: expect.any(String),
              correct_answer: expect.any(String),
              incorrect_answers: expect.any(Array),
            });
          });
        });
    });
  });
});
