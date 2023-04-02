import { authenticatedAgent } from "../infrastructures/basic-authentication";

describe("Cache Routes Validation", () => {
  describe("Create Key-Value Pair", () => {
    it("should fail if key is missing", async () => {
      const response = await authenticatedAgent()
        .post("/cache")
        .send({ value: "test-value" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errors: [
          { field: "key", message: "Invalid value" },
          { field: "key", message: "Key is required" },
        ],
      });
    });

    describe("Get Value by Key", () => {
      it("should return a 404 error if the key does not exist", async () => {
        const response = await authenticatedAgent().get("/cache");

        expect(response.status).toBe(404);
      });
    });
  });
});
