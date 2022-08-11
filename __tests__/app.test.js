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
          // console.log(body);
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
          // console.log(body);
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
