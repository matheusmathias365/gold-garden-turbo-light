import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { VOZ_SCENES, judgeVoz } from "./voz-caso.ts";

describe("voz-caso", () => {
  it("never treats pagar as correct", () => {
    for (const s of VOZ_SCENES) {
      assert.notEqual(s.correct, "pagar");
      assert.equal(judgeVoz(s, "pagar").paidTrap, true);
      assert.equal(judgeVoz(s, "pagar").ok, false);
    }
  });

  it("bank code request is hang up, chefe is call back", () => {
    const banco = VOZ_SCENES.find((s) => s.id === "banco");
    const chefe = VOZ_SCENES.find((s) => s.id === "chefe");
    assert.ok(banco && chefe);
    assert.equal(judgeVoz(banco, "encerrar").ok, true);
    assert.equal(judgeVoz(chefe, "ramal").ok, true);
  });
});
