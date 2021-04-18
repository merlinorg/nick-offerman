import { Of } from "../src/";

class Something {
  public static readonly of = Of(Something);

  constructor(public value: number) {}
}

test("Making something of null", () => {
  expect(Something.of(null)).toBe(null);
});

test("Making something of undefined", () => {
  expect(Something.of(undefined)).toBe(undefined);
});

test("Making something of 1", () => {
  expect(Something.of(1)).toStrictEqual(new Something(1));
});
