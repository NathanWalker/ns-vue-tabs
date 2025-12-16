import * as bufferNs from "buffer";

const globalAny = globalThis as any;

// In this Vite/Rollup pipeline, CommonJS deps are exposed as a wrapper object with `__require()` which returns the real `module.exports`.
const __requireKey = "__require";
const bufferExports =
  bufferNs && typeof (bufferNs as any)[__requireKey] === "function"
    ? (bufferNs as any)[__requireKey]()
    : bufferNs;

const BufferCtor =
  (bufferExports as any).Buffer ||
  ((bufferExports as any).default && (bufferExports as any).default.Buffer) ||
  (bufferExports as any).default ||
  bufferExports;

if (!globalAny.Buffer || typeof globalAny.Buffer.from !== "function") {
  globalAny.Buffer = BufferCtor;
}
