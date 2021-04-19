# nick-offerman

[![npm version](https://badge.fury.io/js/nick-offerman.svg)](https://badge.fury.io/js/nick-offerman)

You know how you always have optional values, `a: A | null |
undefined`, and you want to make something of them or do something
with them. But not if they're nothing, only if they're something.
If they're nothing, they should stay nothing, as is right and
proper.

Something like `a == null ? a : new Something(a)` or maybe
`a == null ? a : doSomething(a)`. But you don't want to keep
typing all that because that's just so much work. And it's not nice.

And you know how if this was Scala, you'd just write something
[fyne](https://github.com/learningobjectsinc/scaloi)
so you could type `a |?> Something` but  it's not, so you can't,
so you just can't have nice things.

Well now you can.

## Optionalisating functions

Transform a function that takes a known value and returns
a known result to one that takes a possible value and returns a
possible result.

```typescript
import { of } from "nick-offerman";

const oparseInt = of(parseInt);

const gooseEgg = oparseInt(null, 10); // null
const fortyTwo = oparseInt("42", 10); // 42
```

At a high level, you can think of this as a function
transformer from `(A, ...B) => C` to
`(A | null | undefined, ...B) => C | null | undefined`
such that if the first parameter is `null` or `undefined`
then so too will be the result.

In practice, it actually returns
`<AA extends Possibly<A>>(AA, ...B) => CoOptional<C, AA>`
which means that the return type matches the optionality
of the supplied parameter. If, for example, you pass a strictly defined
value, then the return type too is strictly defined. If you pass a
value with `null` optionality, then the return type will
only be optional by way of `null`, so the result is no
wider than you would wish.

## Optionalisating constructors

Define a factory method for optionally constructing a class.

```typescript
import { Of } from "nick-offerman";

class Something {
  constructor (public value: number) {
  }

  public static readonly of = Of(Something);
}

const nada = Something.of(null); // null
const nichts = Something.of(undefined); // undefined
const summat = Something.of(1); // Something
let ambiguous: number | undefined;
const unknown = Something.of(ambiguous); // Something | undefined
```

Give a constructor `new (A) => B`, this returns a function that can be thought of as
`(A | null | undefined) => B | null | undefined`. Again, in
practice this returns `<AA extends Possibly<A>>(AA) => CoOptional<B, AA>`
to more accurately preserve optionality in the type system.

## Optionalisating types

Also the types; `Perhaps` to express the blessed state of optionality,
`CoOptional` to widen one type with the optionality of another:

```typescript
type MaybeDate = Perhaps<Date>; // Date | null | undefined
type MaybeString = CoOptional<string, MaybeDate>; // string | null | undefined
type NullyString = CoOptional<string, number | null>; // string | null
```

## Alternatively

Alternatively you could just embrace the [monad](https://github.com/gcanti/fp-ts).

```typescript
pipe(
  possibleValue,
  O.fromNullable,
  O.map((v) => parseInt(v, 10)),
)
```

Or switch to [Scala](https://dotty.epfl.ch/) and inscribe the holy symbol.

```scala
extension [A](a: A | Null)
  def |?> [B](f: A => B): B | Null =
    if (a == null) null else f(a.nn)
```

tldr