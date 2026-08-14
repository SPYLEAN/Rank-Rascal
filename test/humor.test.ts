import assert from "node:assert/strict";
import test from "node:test";
import { accountAge, deterministicPick, dripVerdict } from "../src/humor.js";

test("deterministicPick returns the same result for the same seed", () => {
  const values = ["a", "b", "c"] as const;
  assert.equal(deterministicPick(values, 42), deterministicPick(values, 42));
});

test("drip verdict is stable for a Roblox profile", () => {
  const profile = {
    id: 123,
    username: "Rascal",
    displayName: "Rank Rascal",
    description: "",
    created: "2020-01-01T00:00:00Z",
    isBanned: false,
    avatarUrl: null,
    badgeCount: 12,
  };
  assert.equal(dripVerdict(profile), dripVerdict(profile));
});

test("account age produces a playful label", () => {
  assert.match(accountAge("2010-01-01T00:00:00Z"), /ANCIENT SPECIMEN/);
});
