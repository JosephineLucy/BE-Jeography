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

describe("/student/:username", () => {
  describe("GET /student/:username", () => {
    test("status 200: returns with an object of specified users info", () => {
      return request(app)
        .get("/student/mario")
        .expect(200)
        .then(({ body }) => {
          expect(body.profile).toHaveLength(1);
          expect(body.profile[0]).toMatchObject({
            _id: "62f4e68fd27bf3981e8ee25e",
            avatarId: "https://i.imgur.com/mM4LmUV.png",
            email: "mario@gmail.com",
            jeo_ranch: [
              "https://i.imgur.com/oxYZ7c2.png",
              "https://i.imgur.com/T5IjKoI.png",
              "https://i.imgur.com/x0cwPla.png",
              "https://i.imgur.com/mM4LmUV.png",
            ],
            password: "unique",
            type: "student",
            userPoints: 10,
            userStatus: "I am a geography quiz whiz!",
            username: "mario",
          });
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