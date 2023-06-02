import * as dntShim from "./_dnt.test_shims.js";
import * as assert from "@bearz-sh/assertions";
import { DENO_INTERNALS, GLOBALS, IS_BROWSER, IS_BUN, IS_DENO, IS_NODE, IS_NODE_LIKE, RUNTIME, RUNTIME_VERSION, VERSIONS, } from "./mod.js";
// there no way to easily test this without reproducing the code
// in the module to a degree.
dntShim.Deno.test("runtime_info", () => {
    // deno-lint-ignore no-explicit-any
    const g = dntShim.dntGlobalThis;
    assert.exists(VERSIONS);
    if (g.Deno && g.Deno.internal) {
        assert.strictEquals(g, GLOBALS);
        assert.exists(g.Deno);
        assert.ok(IS_DENO);
        assert.notOk(IS_NODE);
        assert.notOk(IS_BROWSER);
        assert.notOk(IS_NODE_LIKE);
        assert.notOk(IS_BUN);
        assert.strictEquals(RUNTIME, "deno");
        assert.exists(RUNTIME_VERSION);
        assert.strictEquals(RUNTIME_VERSION, g.Deno.version.deno);
        assert.exists(DENO_INTERNALS);
    }
    if (g.process) {
        assert.exists(g.process);
        assert.notOk(IS_DENO);
        assert.notOk(IS_BROWSER);
        assert.ok(IS_NODE_LIKE);
        assert.exists(RUNTIME_VERSION);
        if (g.Bun) {
            assert.ok(IS_BUN);
            assert.notOk(IS_NODE);
            assert.strictEquals(RUNTIME, "bun");
            assert.strictEquals(RUNTIME_VERSION, g.process.versions.bun);
        }
        else {
            assert.ok(IS_NODE);
            assert.notOk(IS_BUN);
            assert.strictEquals(RUNTIME, "node");
            assert.strictEquals(RUNTIME_VERSION, g.process.versions.node);
        }
    }
    if (!IS_DENO && !IS_NODE_LIKE && g.navigator) {
        assert.exists(g.window);
        assert.ok(IS_BROWSER);
        assert.notOk(IS_NODE);
        assert.notOk(IS_NODE_LIKE);
        assert.notOk(IS_BUN);
        assert.notOk(IS_DENO);
        assert.strictEquals(RUNTIME, "browser");
    }
});
