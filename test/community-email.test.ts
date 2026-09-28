import test from "node:test";
import assert from "node:assert/strict";
import {
  asAttachment,
  buildCertificateSvg,
  buildReviewerBadgeSvg,
  escapeHtml,
  generateReviewerId,
} from "../apps/web/lib/community-email.js";

test("reviewer IDs are stable, scoped and do not disclose the email", () => {
  const first = generateReviewerId("Scout@Example.com", "A detailed review", "2026-09-27", "secret");
  const repeated = generateReviewerId("scout@example.com", "A detailed review", "2026-09-27", "secret");
  const changed = generateReviewerId("scout@example.com", "A different review", "2026-09-27", "secret");

  assert.equal(first, repeated);
  assert.notEqual(first, changed);
  assert.match(first, /^QA-20260927-[A-F0-9]{8}$/);
  assert.equal(first.includes("scout"), false);
});

test("personalized reviewer artwork escapes untrusted names", () => {
  const input = { name: "<script>alert('x')</script>", reviewerId: "QA-20260927-ABCD1234", issuedOn: "2026-09-27" };
  const badge = buildReviewerBadgeSvg(input);
  const certificate = buildCertificateSvg(input);

  assert.equal(badge.includes("<script>"), false);
  assert.equal(certificate.includes("<script>"), false);
  assert.match(badge, /&lt;script&gt;/);
  assert.match(certificate, /QA-20260927-ABCD1234/);
});

test("email helpers escape HTML and encode SVG attachments", () => {
  assert.equal(escapeHtml(`A&B <C> "D" 'E'`), "A&amp;B &lt;C&gt; &quot;D&quot; &#039;E&#039;");
  const attachment = asAttachment("badge.svg", "<svg>badge</svg>");
  assert.equal(attachment.filename, "badge.svg");
  assert.equal(Buffer.from(attachment.content, "base64").toString("utf8"), "<svg>badge</svg>");
});
