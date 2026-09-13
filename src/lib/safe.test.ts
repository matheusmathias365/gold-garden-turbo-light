import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isHttpUrl, safeFilePart, sanitizeCallsign } from "./safe.ts";

describe("safe", () => {
  it("strips markup and keeps a short callsign", () => {
    assert.equal(sanitizeCallsign("<script>xss</script>"), "SCRIPTXSSSCRIPT");
    assert.equal(sanitizeCallsign("agente joão 99"), "AGENTE JOÃO 99");
    assert.equal(sanitizeCallsign("a".repeat(40)).length, 16);
  });

  it("never lets a filename climb directories", () => {
    assert.equal(safeFilePart("../etc/passwd"), "ETCPASSWD");
    assert.equal(isHttpUrl("pix-lua-mesa.tk"), false);
    assert.equal(isHttpUrl("https://evil.example"), true);
  });
});
