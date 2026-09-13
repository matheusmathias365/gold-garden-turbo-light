import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { dealShift, judge, tally, TICKETS } from "./plantao.ts";

describe("plantao", () => {
  it("deals 8 tickets with 4 baits", () => {
    const q = dealShift();
    assert.equal(q.length, 8);
    assert.equal(q.filter((t) => t.correct === "golpe").length, 4);
    assert.equal(q.filter((t) => t.correct === "oficial").length, 2);
    assert.equal(q.filter((t) => t.correct === "ignorar").length, 2);
    const ids = new Set(q.map((t) => t.id));
    assert.equal(ids.size, 8);
  });

  it("counts baits left through and false alarms", () => {
    const golpe = TICKETS.find((t) => t.correct === "golpe");
    const oficial = TICKETS.find((t) => t.correct === "oficial");
    assert.ok(golpe && oficial);
    const miss = judge(golpe, "ignorar");
    assert.equal(miss.ok, false);
    assert.equal(miss.baitPassed, true);
    const alarm = judge(oficial, "golpe");
    assert.equal(alarm.falseAlarm, true);
    const timeout = judge(golpe, "timeout");
    assert.equal(timeout.baitPassed, true);
    const log = [
      { ticket: golpe, action: "ignorar" as const, ...miss },
      { ticket: oficial, action: "golpe" as const, ...alarm },
    ];
    const s = tally(log);
    assert.equal(s.passed, 1);
    assert.equal(s.falseAlarms, 1);
    assert.equal(s.caught, 0);
  });
});
