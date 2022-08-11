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

describe("PATCH /students/:username/userPoints", () => {
  it("200: responds with the updated student object where userPoints are incremented by 1", () => {
    const username = "mario";
    const userPointsUpdate = {
      userPoints: 1,
    };
    return request(app)
      .patch(`/students/${username}/userPoints`)
      .send(userPointsUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.student).toEqual(
          expect.objectContaining({
            acknowledged: true,
          })
        );
      });
  });
});

describe("GET /student/:username", () => {
  describe("GET /student/:username", () => {
    test("status 200: returns with an object of specified users info", () => {
      return request(app)
        .get("/student/mario")
        .expect(200)
        .then(({ body }) => {
          expect(body.profile).toHaveLength(1);
          expect.objectContaining({
            _id: expect.any(String),
            avatarId: expect.any(String),
            email: expect.any(String),
            jeo_ranch: expect.any(Array),
            password: expect.any(String),
            type: expect.any(String),
            userPoints: expect.any(Number),
            userStatus: expect.any(String),
            username: expect.any(String),
          });
        });
    });
  });
});

describe("POST /student", () => {
  describe("POST /student", () => {
    test("status 201: responds with a body of a posted student", () => {
      const studentToPost = {
        username: "Jamie",
        password: "letsHope123",
        email: "jamiete@gmail.com",
      };

      return request(app)
        .post("/student")
        .send(studentToPost)
        .expect(201)
        .then(({ body }) => {
          expect(body.student).toEqual({
            acknowledged: true,
            insertedId: expect.any(String),
          });
        });
    });
  });
});

describe("PATCH /students/:username/ranch", () => {
  it("200: responds with the updated student object where jeoRanch has a new badge", () => {
    const username = "mario";
    return request(app)
      .patch(`/students/${username}/ranch`)
      .send()
      .expect(200)
      .then(({ body }) => {
        expect.objectContaining({
          acknowledged: true,
        });
      });
  });
});
