/** `A` or `null` or `undefined`. */
export type Perhaps<A> = A | null | undefined;

/** Returns `A` with the same optionality as `B`. */
export type CoOptional<A, B> =
  | Extract<B, null | undefined>
  | (Exclude<B, null | undefined> extends never ? never : A);

export type MonoCtor = new (arg: any) => any;
export type MonoParam<A extends MonoCtor> = ConstructorParameters<A>[0];

/** Given a single-parameter constructor, return a function that will accept either
 * null, undefined or that single parameter, and return either null, undefined or a
 * new instance of the corresponding class.
 * @param Ctor the constructor
 * @return an optional factory method
 */
export const Of = <A extends MonoCtor>(Ctor: A) => <
  B extends Perhaps<MonoParam<A>>
>(
  param: B,
): CoOptional<InstanceType<A>, B> => (param == null ? param : new Ctor(param));

/** Given a function, return a new function with the same shape but an optional first
 * parameter, that returns either null or undefined if that first parameter is
 * null or undefined, or else the result of invoking the wrapped function.
 * @param func the function to wrap
 * @return a new more optional function
 */
export const of = <A, B extends readonly unknown[], C>(
  func: (arg: A, ...args: B) => C,
) => <AA extends Perhaps<A>>(param: AA, ...rest: B): CoOptional<C, AA> =>
  (param == null ? param : func(param as A, ...rest)) as any;
