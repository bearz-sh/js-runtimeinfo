# Bearz-Sh RuntimeInfo

Provides basic javascript engine runtime information as constants such as IS_DENO, IS_NODE_LIKE, GLOBALS, and RUNTIME to
help create modules that need to deal with differences in runtimes.

## Deno Example

```ts
import {
    DENO_INTERNALS,
    GLOBALS,
    IS_BROWSER,
    IS_BUN,
    IS_DENO,
    IS_NODE,
    IS_NODE_LIKE,
    RUNTIME,
    RUNTIME_VERSION,
    VERSIONS,
} from "https://deno.land/x/bearzsh_runtimeinfo@MOD_VERSION/mod.ts";

if (IS_DENO) {
    const Deno = GLOBALS.Deno;
    console.log(Deno);
}

if (IS_NODE_LIKE) {
    const process = GLOBALS.process;
    console.log(process);
}

if (IS_BROWSER) {
    const navigator = GLOBALS.navigator;
    console.log(navigator);
}

console.log("runtime", RUNTIME);
console.log("rt_version", RUNTIME_VERSION);
```

## Node Example

```ts
import {
    DENO_INTERNALS,
    GLOBALS,
    IS_BROWSER,
    IS_BUN,
    IS_DENO,
    IS_NODE,
    IS_NODE_LIKE,
    RUNTIME,
    RUNTIME_VERSION,
    VERSIONS,
} from "@bearz-sh/runtimeinfo";

if (IS_DENO) {
    const Deno = GLOBALS.Deno;
    console.log(Deno);
}

if (IS_NODE_LIKE) {
    const process = GLOBALS.process;
    console.log(process);
}

if (IS_BROWSER) {
    const navigator = GLOBALS.navigator;
    console.log(navigator);
}

console.log("runtime", RUNTIME);
console.log("rt_version", RUNTIME_VERSION);
```

## LICENSE

MIT
