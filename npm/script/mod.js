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
exports.GLOBALS = exports.DENO_INTERNALS = exports.VERSIONS = exports.RUNTIME_VERSION = exports.RUNTIME = exports.IS_NODE_LIKE = exports.IS_BUN = exports.IS_BROWSER = exports.IS_NODE = exports.IS_DENO = void 0;
// deno-lint-ignore no-explicit-any
const dntShim = __importStar(require("./_dnt.shims.js"));
const g = dntShim.dntGlobalThis;
let isBun = false;
let isDeno = false;
let isNode = false;
let isNodeLike = false;
let isBrowser = false;
let runtime = "unknown";
let denoInternals = {};
let versions = {};
let runtimeVersion = "0.0.0";
if (g.Deno) {
    isDeno = true;
    runtime = "deno";
    const internals = g.Deno[g.Deno.internal];
    if (internals) {
        denoInternals = internals;
    }
    versions = g.Deno.version;
    runtimeVersion = versions.deno;
}
if (g.process) {
    isNodeLike = true;
    versions = g.process.versions;
    if (g.Bun) {
        isBun = true;
        runtime = "bun";
        runtimeVersion = versions.bun;
    }
    else {
        isNode = true;
        runtime = "node";
        runtimeVersion = versions.node;
    }
}
if (!isDeno && !isNodeLike && g.window) {
    isBrowser = true;
    runtime = "browser";
    if (g.navigator.userAgentData) {
        const brands = g.navigator.userAgentData.brands;
        for (let i = 0; i < brands.length; i++) {
            const item = brands[i];
            versions[item.brand] = item.version;
            if (!item.brand.includes("Brand")) {
                runtimeVersion = item.version;
            }
        }
        if (brands.length > 2 && versions["Chromium"]) {
            runtimeVersion = versions["Chromium"];
        }
    }
    else {
        const ua = g.navigator.userAgent;
        const parts = ua.split(" ");
        for (let i = 0; i < parts.length; i++) {
            const p = parts[i];
            if (p.startsWith("Firefox/")) {
                versions["Firefox"] = p.substring(8);
                runtimeVersion = versions["Firefox"];
                break;
            }
            if (p.startsWith("Safari/")) {
                versions["Safari"] = p.substring(7);
                runtimeVersion = versions["Safari"];
                break;
            }
        }
    }
}
exports.IS_DENO = isDeno;
exports.IS_NODE = isNode;
exports.IS_BROWSER = isBrowser;
exports.IS_BUN = isBun;
exports.IS_NODE_LIKE = isNodeLike;
exports.RUNTIME = runtime;
exports.RUNTIME_VERSION = runtimeVersion;
exports.VERSIONS = versions;
exports.DENO_INTERNALS = denoInternals;
exports.GLOBALS = g;
