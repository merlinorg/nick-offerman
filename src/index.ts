export type Perhaps<A> = A | null | undefined;
export type MonoCtor = new (arg: any) => any;
export type MonoParam<A extends MonoCtor> = ConstructorParameters<A>[0];

export const Of = <A extends MonoCtor>(Ctor: A) => <
  B extends Perhaps<MonoParam<A>>
>(
  param: B,
):
  | Extract<B, undefined | null>
  | (Exclude<B, null | undefined> extends never ? never : InstanceType<A>) =>
  param == null ? param : new Ctor(param);
