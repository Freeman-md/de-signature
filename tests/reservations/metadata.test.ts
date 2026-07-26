import { describe, expect, it } from "vitest";

import { metadata } from "@/app/layout";

describe("public metadata", () => {
  it("uses The Signature branding throughout the metadata copy", () => {
    const serializedMetadata = JSON.stringify(metadata);

    expect(serializedMetadata).toContain("The Signature");
    expect(serializedMetadata).not.toContain("De Signature");
  });
});
