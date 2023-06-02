"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dntShim = __importStar(require("./_dnt.test_shims.js"));
const assert = __importStar(require("@bearz-sh/assertions"));
const mod_js_1 = require("./mod.js");
// there no way to easily test this without reproducing the code
// in the module to a degree.
dntShim.Deno.test("runtime_info", () => {
    // deno-lint-ignore no-explicit-any
    const g = dntShim.dntGlobalThis;
    assert.exists(mod_js_1.VERSIONS);
    if (g.Deno && g.Deno.internal) {
        assert.strictEquals(g, mod_js_1.GLOBALS);
        assert.exists(g.Deno);
        assert.ok(mod_js_1.IS_DENO);
        assert.notOk(mod_js_1.IS_NODE);
        assert.notOk(mod_js_1.IS_BROWSER);
        assert.notOk(mod_js_1.IS_NODE_LIKE);
        assert.notOk(mod_js_1.IS_BUN);
        assert.strictEquals(mod_js_1.RUNTIME, "deno");
        assert.exists(mod_js_1.RUNTIME_VERSION);
        assert.strictEquals(mod_js_1.RUNTIME_VERSION, g.Deno.version.deno);
        assert.exists(mod_js_1.DENO_INTERNALS);
    }
    if (g.process) {
        assert.exists(g.process);
        assert.notOk(mod_js_1.IS_DENO);
        assert.notOk(mod_js_1.IS_BROWSER);
        assert.ok(mod_js_1.IS_NODE_LIKE);
        assert.exists(mod_js_1.RUNTIME_VERSION);
        if (g.Bun) {
            assert.ok(mod_js_1.IS_BUN);
            assert.notOk(mod_js_1.IS_NODE);
            assert.strictEquals(mod_js_1.RUNTIME, "bun");
            assert.strictEquals(mod_js_1.RUNTIME_VERSION, g.process.versions.bun);
        }
        else {
            assert.ok(mod_js_1.IS_NODE);
            assert.notOk(mod_js_1.IS_BUN);
            assert.strictEquals(mod_js_1.RUNTIME, "node");
            assert.strictEquals(mod_js_1.RUNTIME_VERSION, g.process.versions.node);
        }
    }
    if (!mod_js_1.IS_DENO && !mod_js_1.IS_NODE_LIKE && g.navigator) {
        assert.exists(g.window);
        assert.ok(mod_js_1.IS_BROWSER);
        assert.notOk(mod_js_1.IS_NODE);
        assert.notOk(mod_js_1.IS_NODE_LIKE);
        assert.notOk(mod_js_1.IS_BUN);
        assert.notOk(mod_js_1.IS_DENO);
        assert.strictEquals(mod_js_1.RUNTIME, "browser");
    }
});
