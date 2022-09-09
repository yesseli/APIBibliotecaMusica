const request = require("supertest");
const app = require("../app");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { storageModel } = require("../models");
const { testAuthRegister } = require("./helper/helperData")
let JWT_TOKEN = "";
const filePath = `${__dirname}/dump/track.mp3`;

/**
 * necesitamos obtener el JWT de session antes que todo!
 */
beforeAll(async () => {
    const user = usersModel.findOne({email: "test@test.com"});
    JWT_TOKEN = await tokenSign(user);
  });

  /**
   * [POST STORAGE] Test for upload file
   */
  describe("[STORAGE] Upload file", ()=>{
    test("should uplaod file", async () => {
        const res = await request(app)
          .post("/api/storage")
          .set("Authorization", `Bearer ${JWT_TOKEN}`)
          .attach("myfile", filePath);
        const { body } = res;
        expect(res.statusCode).toEqual(200);
        expect(body).toHaveProperty("data");
        expect(body).toHaveProperty("data.url");
      });
  });

  /**
   * [GET STORAGE LIST] Test get list items
   */
  describe("[STORAGE] Return all files", ()=>{
    test("should create a return all", async () => {
        const res = await request(app)
          .get("/api/storage")
          .set("Authorization", `Bearer ${JWT_TOKEN}`);
        const { body } = res;
        expect(res.statusCode).toEqual(200);
        const { data } = body;
        expect(body).toHaveProperty("data");
      });
});

/**
 * [GET STORAGE ITEM] Test get detail item
 */
describe ("[STORAGE] Return one item", () =>{
    let id = ''
    test ("debe retornar el id de un item", async () =>{
        const { _id } = await storageModel.findOne();
        id = _id.toString();
    })

    test("debe retornar todo el detalle del item", async () => {
        const res = await request(app)
          .get(`/api/storage/${id}`)
          .set("Authorization", `Bearer ${JWT_TOKEN}`);
        const { body } = res;
        expect(res.statusCode).toEqual(200);
        expect(body).toHaveProperty("data");
      });
})