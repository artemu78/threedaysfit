// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";

describe("workout progress persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
  });

  it("restores completed exercise sets after the application reloads", async () => {
    const { useUser: storeBeforeReload } = await import("./store");
    const completedSets = [
      {
        isComplete: true,
        weight: 42,
        reps: 8,
      },
    ];

    storeBeforeReload.getState().setDailyProgress("9", completedSets);

    vi.resetModules();
    const { useUser: storeAfterReload } = await import("./store");

    expect(storeAfterReload.getState().user?.dailyData?.["9"]).toEqual(
      completedSets,
    );
  });
});
