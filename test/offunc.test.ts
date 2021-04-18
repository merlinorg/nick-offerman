import { of } from "../src/";

const func = (a: string, b: number): string => a + b;

const ofunc = of(func);

const TEN = 10; // should pull in base-ten

test("Functioning from null", () => {
  expect(ofunc(null, 2)).toBe(null);
});

test("Functioning from undefined", () => {
  expect(ofunc(undefined, 2)).toBe(undefined);
});

test("Functioning from a string", () => {
  expect(ofunc("hello to you ", 2)).toBe("hello to you 2");
});

test("Parsing ints", () => {
  expect(of(parseInt)(undefined, TEN)).toBe(undefined);
});
