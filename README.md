# nick-offerman

[![npm version](https://badge.fury.io/js/nick-offerman.svg)](https://badge.fury.io/js/nick-offerman)

You know how you always have optional values, `a: A | null |
undefined`, and you want to make something of them, but not if they're
nothing. If they're nothing, they should stay nothing, just like
things are. Something like `a == null ? null : new Something(a)`.
But you don't want to keep typing that because that's just so much
work. And it's not nice. And you know how if this was Scala, you'd
just write something fine so you could type `a ?|> Something` but
it's not, so you can't, so you just can't have nice things.

Well now you can.

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

Types are duly considered so the return type matches exactly
the optionality  of the parameter.
