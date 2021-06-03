// test("two plus two is four", () => {
//   expect(2 + 2).toBe(4);
// });
import "regenerator-runtime/runtime";
import { rimraf } from "rimraf";
import { sampleGenerateMessage } from "../src/sampleData";
import { run } from "../src/generateCode";
import { existsSync } from "fs";

test("Run Test", async () => {
  const testPath = "../";
  const testMessage = sampleGenerateMessage;

  if (existsSync(testPath + "sample-app")) {
    rimraf.sync(testPath + "sample-app");
  }

  //const res = await waitUntil(() => run(testMessage, testPath), WAIT_FOREVER);
  const res = await run(testMessage, testPath);
  expect(res).toBe("DONE");
});
