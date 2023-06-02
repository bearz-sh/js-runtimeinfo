// deno-lint-ignore no-explicit-any
import * as dntShim from "./_dnt.shims.js";

const g = dntShim.dntGlobalThis as any;

export type Runtime = "deno" | "node" | "bun" | "browser" | "unknown";

let isBun = false;
let isDeno = false;
let isNode = false;
let isNodeLike = false;
let isBrowser = false;
let runtime: Runtime = "unknown";

let denoInternals: Record<string, unknown> = {};
let versions: Record<string, string> = {};
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
    } else {
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
    } else {
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

export const IS_DENO = isDeno;
export const IS_NODE = isNode;
export const IS_BROWSER = isBrowser;
export const IS_BUN = isBun;
export const IS_NODE_LIKE = isNodeLike;
export const RUNTIME = runtime;
export const RUNTIME_VERSION = runtimeVersion;
export const VERSIONS = versions;
export const DENO_INTERNALS = denoInternals;
export const GLOBALS = g;
