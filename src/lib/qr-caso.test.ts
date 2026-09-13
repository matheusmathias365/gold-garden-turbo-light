import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { QR_SCENES, judgeQr, qrCells } from "./qr-caso.ts";

describe("qr-caso", () => {
  it("never treats pagar as correct", () => {
    for (const s of QR_SCENES) {
      assert.notEqual(s.correct, "pagar");
      assert.equal(judgeQr(s, "pagar").paidTrap, true);
      assert.equal(judgeQr(s, "pagar").ok, false);
    }
  });

  it("mismatch scenes refuse, matching cupom goes official", () => {
    const mesa = QR_SCENES.find((s) => s.id === "mesa");
    const padaria = QR_SCENES.find((s) => s.id === "padaria");
    assert.ok(mesa && padaria);
    assert.equal(judgeQr(mesa, "recusar").ok, true);
    assert.equal(judgeQr(padaria, "oficial").ok, true);
    assert.equal(qrCells("mesa").length, 21 * 21);
  });
});
