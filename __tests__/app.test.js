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

// describe("/:country", () => {
//   describe("GET /:country", () => {
//     test("status 200: returns an array of the questions for a specific country", () => {
//       return request(app)
//         .get("/englandDB")
//         .expect(200)
//         .then(({ body }) => {
//           console.log(body);
//         });
//     });
//   });
// });
