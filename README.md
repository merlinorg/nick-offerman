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

```typescript
import { of } from "nick-offerman";

const oparseInt = of(parseInt);

const gooseEgg = oparseInt(null, 10); // null
const fortyTwo = oparseInt("42", 10); // 42
```

## Optionalisating constructors

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

## Optionalisating types

Also the types; `Perhaps` to express the blessed state of optionality,
`CoOptional` to widen one type with the optionality of another:

```typescript
type MaybeDate = Perhaps<Date>; // Date | null | undefined
type MaybeString = CoOptional<string, MaybeDate>; // string | null | undefined
type NullyString = CoOptional<string, number | null>; // string | null
```
