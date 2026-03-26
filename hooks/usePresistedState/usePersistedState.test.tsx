import { test, expect } from "@playwright/experimental-ct-react";
import {
  PersistedStateDisplay,
  PersistedObjectState,
  CustomSerializationComponent,
  RemoveIfDefaultComponent,
  MultipleKeysComponent,
  DeserializationErrorComponent,
  RouterPersistedState,
  StorageTypeComponent,
  SyncUrlComponent,
} from "./usePersistedState.test-components";

test.describe("usePersistedState Hook", () => {
  // ===== Basic State Management =====
  test.describe("Basic State Management", () => {
    test("should initialize with default value", async ({ mount, page }) => {
      // Clear any existing storage
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <PersistedStateDisplay storageKey="test-basic" defaultValue="hello" />,
      );

      await expect(component.getByTestId("state-value")).toHaveText("hello");
    });

    test("should update state when button clicked", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <PersistedStateDisplay
          storageKey="test-update"
          defaultValue="initial"
        />,
      );

      await expect(component.getByTestId("state-value")).toHaveText("initial");

      await component.getByTestId("update-button").click();

      await expect(component.getByTestId("state-value")).toHaveText("updated");
    });

    test("should support updater function (prev => next)", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <PersistedStateDisplay storageKey="test-modify" defaultValue="base" />,
      );

      await expect(component.getByTestId("state-value")).toHaveText("base");

      await component.getByTestId("modify-button").click();

      await expect(component.getByTestId("state-value")).toHaveText(
        "base-modified",
      );
    });
  });

  // ===== localStorage Persistence =====
  test.describe("localStorage Persistence", () => {
    test("should persist state to localStorage when updated", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <PersistedStateDisplay
          storageKey="test-storage"
          defaultValue="start"
        />,
      );

      await component.getByTestId("update-button").click();

      const storedValue = await page.evaluate(() =>
        localStorage.getItem("test-storage"),
      );
      expect(storedValue).toBe('"updated"');
    });

    test("should restore state from localStorage on mount", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());
      await page.evaluate(() =>
        localStorage.setItem("test-restore", '"restored-value"'),
      );

      const component = await mount(
        <PersistedStateDisplay
          storageKey="test-restore"
          defaultValue="default"
        />,
      );

      await expect(component.getByTestId("state-value")).toHaveText(
        "restored-value",
      );
    });

    test("should update localStorage when state changes", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <PersistedStateDisplay
          storageKey="test-update-storage"
          defaultValue="a"
        />,
      );

      await component.getByTestId("update-button").click();
      await page.waitForTimeout(100);
      await expect(component.getByTestId("state-value")).toHaveText("updated");

      const stored = await page.evaluate(() =>
        localStorage.getItem("test-update-storage"),
      );
      expect(stored).toBe('"updated"');
    });

    test("should handle complex objects in localStorage", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <PersistedObjectState storageKey="test-object" />,
      );

      await expect(component.getByTestId("object-name")).toHaveText("test");
      await expect(component.getByTestId("object-count")).toHaveText("0");

      await component.getByTestId("update-object-button").click();

      await expect(component.getByTestId("object-name")).toHaveText("updated");
      await expect(component.getByTestId("object-count")).toHaveText("5");

      const stored = await page.evaluate(() =>
        localStorage.getItem("test-object"),
      );
      expect(stored).toContain('"name":"updated"');
      expect(stored).toContain('"count":5');
    });

    test("should handle object immutability correctly", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <PersistedObjectState storageKey="test-immutable" />,
      );

      // Increment once with wait
      await component.getByTestId("increment-button").click();
      await page.waitForTimeout(200);
      await expect(component.getByTestId("object-count")).toHaveText("1");

      // Increment second time with wait
      await component.getByTestId("increment-button").click();
      await page.waitForTimeout(200);
      await expect(component.getByTestId("object-count")).toHaveText("2");

      // Increment third time with wait
      await component.getByTestId("increment-button").click();
      await page.waitForTimeout(200);
      await expect(component.getByTestId("object-count")).toHaveText("3");

      // Verify storage
      const stored = await page.evaluate(() =>
        localStorage.getItem("test-immutable"),
      );
      expect(JSON.parse(stored!).count).toBe(3);
    });
  });

  // ===== Custom Serialization =====
  test.describe("Custom Serialization & Deserialization", () => {
    test("should use custom serialize function", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <CustomSerializationComponent storageKey="test-custom-serialize" />,
      );

      await component.getByTestId("set-custom").click();

      const stored = await page.evaluate(() =>
        localStorage.getItem("test-custom-serialize"),
      );
      expect(stored).toBe("num:42");

      await expect(component.getByTestId("custom-value")).toHaveText("42");
    });

    test("should use custom deserialize function", async ({ mount, page }) => {
      await page.evaluate(() => {
        localStorage.clear();
        localStorage.setItem("test-custom-deserialize", "num:99");
      });

      const component = await mount(
        <CustomSerializationComponent storageKey="test-custom-deserialize" />,
      );

      await expect(component.getByTestId("custom-value")).toHaveText("99");
    });

    test("should fall back to default on deserialization error", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => {
        localStorage.clear();
        localStorage.setItem("test-custom-deserialize-error", "num:invalid");
      });

      const component = await mount(
        <CustomSerializationComponent storageKey="test-custom-deserialize-error" />,
      );

      // Catch console errors to verify warning was logged
      const warnings: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "warning") {
          warnings.push(msg.text());
        }
      });

      await page.waitForTimeout(100);
      await expect(component.getByTestId("custom-value")).toHaveText("0");
    });
  });

  // ===== Default Value Behavior =====
  test.describe("Default Value Behavior", () => {
    test("should use default when neither URL nor storage has value", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <PersistedStateDisplay
          storageKey="test-default-pristine"
          defaultValue="pristine-default"
        />,
      );

      await expect(component.getByTestId("state-value")).toHaveText(
        "pristine-default",
      );
    });

    test("should prefer URL param over default", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      // In appRoute mode, query params are encoded inside appRoute.
      await page.goto("/?appRoute=/%3Ftest-url-priority%3D%2522from-url%2522");

      const component = await mount(
        <RouterPersistedState
          storageKey="test-url-priority"
          defaultValue="from-default"
        />,
      );

      // URL param should take precedence
      await expect(component.getByTestId("router-state-value")).toHaveText(
        "from-url",
      );
    });

    test("should prefer URL param over localStorage", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => {
        localStorage.clear();
        localStorage.setItem("test-url-vs-storage", '"from-storage"');
      });

      await page.goto(
        "/?appRoute=/%3Ftest-url-vs-storage%3D%2522from-url%2522",
      );

      const component = await mount(
        <RouterPersistedState
          storageKey="test-url-vs-storage"
          defaultValue="from-default"
        />,
      );

      await expect(component.getByTestId("router-state-value")).toHaveText(
        "from-url",
      );
    });
  });

  // ===== removeIfDefault Behavior =====
  test.describe("removeIfDefault Behavior", () => {
    test("should remove from localStorage when set to default and removeIfDefault=true", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <RemoveIfDefaultComponent
          storageKey="test-remove-if-default-true"
          defaultValue="default"
          removeIfDefault={true}
        />,
      );

      // Set to something custom
      await component.getByTestId("set-custom-button").click();
      await page.waitForTimeout(200);
      await expect(component.getByTestId("remove-if-default-value")).toHaveText(
        "custom",
      );

      let stored = await page.evaluate(() =>
        localStorage.getItem("test-remove-if-default-true"),
      );
      expect(stored).toBe('"custom"');

      // Reset to default
      await component.getByTestId("reset-button").click();
      await page.waitForTimeout(200);
      await expect(component.getByTestId("remove-if-default-value")).toHaveText(
        "default",
      );

      stored = await page.evaluate(() =>
        localStorage.getItem("test-remove-if-default-true"),
      );
      expect(stored).toBeNull();
    });

    test("should keep in localStorage when set to default and removeIfDefault=false", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <RemoveIfDefaultComponent
          storageKey="test-remove-if-default-false"
          defaultValue="default"
          removeIfDefault={false}
        />,
      );

      // Set to default
      await component.getByTestId("reset-button").click();
      await page.waitForTimeout(100);
      await expect(component.getByTestId("remove-if-default-value")).toHaveText(
        "default",
      );

      const stored = await page.evaluate(() =>
        localStorage.getItem("test-remove-if-default-false"),
      );
      expect(stored).toBe('"default"');
    });

    test("should remove from URL when set to default and removeIfDefault=true", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <RemoveIfDefaultComponent
          storageKey="test-remove-url-param"
          defaultValue="default"
          removeIfDefault={true}
        />,
      );

      // Set to custom
      await component.getByTestId("set-custom-button").click();
      await page.waitForTimeout(200);

      let url = page.url();
      expect(url).toContain("test-remove-url-param");

      // Reset to default
      await component.getByTestId("reset-button").click();
      await page.waitForTimeout(200);

      url = page.url();
      expect(url).not.toContain("test-remove-url-param");
    });
  });

  // ===== Multiple Independent Keys =====
  test.describe("Multiple Independent Keys", () => {
    test("should manage multiple keys independently", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(<MultipleKeysComponent />);

      await expect(component.getByTestId("email-value")).toHaveText(
        "default@example.com",
      );
      await expect(component.getByTestId("theme-value")).toHaveText("light");

      await component.getByTestId("change-email").click();
      await expect(component.getByTestId("email-value")).toHaveText(
        "new@example.com",
      );
      await expect(component.getByTestId("theme-value")).toHaveText("light");

      await component.getByTestId("change-theme").click();
      await expect(component.getByTestId("email-value")).toHaveText(
        "new@example.com",
      );
      await expect(component.getByTestId("theme-value")).toHaveText("dark");

      const email = await page.evaluate(() => localStorage.getItem("email"));
      const theme = await page.evaluate(() => localStorage.getItem("theme"));

      expect(email).toBe('"new@example.com"');
      expect(theme).toBe('"dark"');
    });
  });

  // ===== Error Handling =====
  test.describe("Error Handling", () => {
    test("should fall back to default on URL deserialization error", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      // Navigate with invalid JSON in URL param
      await page.goto("/?test-error-url=%22invalid");

      const component = await mount(
        <PersistedStateDisplay
          storageKey="test-error-url"
          defaultValue="error-default"
        />,
      );

      await expect(component.getByTestId("state-value")).toHaveText(
        "error-default",
      );
    });

    test("should fall back to default on localStorage deserialization error", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => {
        localStorage.clear();
        // Store invalid JSON
        localStorage.setItem("test-error-storage", "invalid-json{");
      });

      const component = await mount(
        <PersistedStateDisplay
          storageKey="test-error-storage"
          defaultValue="error-default"
        />,
      );

      await expect(component.getByTestId("state-value")).toHaveText(
        "error-default",
      );
    });

    test("should handle custom deserialization errors gracefully", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <DeserializationErrorComponent storageKey="test-custom-error" />,
      );

      await expect(component.getByTestId("error-fallback-value")).toHaveText(
        "fallback",
      );

      await component.getByTestId("set-working").click();
      await page.waitForTimeout(200);
      await expect(component.getByTestId("error-fallback-value")).toHaveText(
        "working",
      );
    });
  });

  // ===== Serialization Format =====
  test.describe("Serialization Format", () => {
    test("should use JSON.stringify by default", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <PersistedObjectState storageKey="test-json-format" />,
      );

      await component.getByTestId("update-object-button").click();

      const stored = await page.evaluate(() =>
        localStorage.getItem("test-json-format"),
      );

      // Should be valid JSON
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveProperty("name", "updated");
      expect(parsed).toHaveProperty("count", 5);
    });
  });

  // ===== Rapid Updates =====
  test.describe("Rapid State Updates", () => {
    test("should handle rapid sequential updates", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <PersistedStateDisplay
          storageKey="test-rapid-updates"
          defaultValue="0"
        />,
      );

      // Click the modify button with waits between
      for (let i = 0; i < 5; i++) {
        await component.getByTestId("modify-button").click();
        await page.waitForTimeout(80);
      }

      await page.waitForTimeout(200);

      const stored = await page.evaluate(() =>
        localStorage.getItem("test-rapid-updates"),
      );

      // Should end with "0-modified-modified-modified-modified-modified"
      expect(stored).toContain("modified");
    });
  });

  // ===== Storage Type =====
  test.describe("Storage Type", () => {
    test("should default to localStorage", async ({ mount, page }) => {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });

      const component = await mount(
        <StorageTypeComponent
          storageKey="test-default-storage"
          storageType="localStorage"
        />,
      );

      await component.getByTestId("set-button").click();
      await page.waitForTimeout(100);

      const inLocal = await page.evaluate(() =>
        localStorage.getItem("test-default-storage"),
      );
      const inSession = await page.evaluate(() =>
        sessionStorage.getItem("test-default-storage"),
      );

      expect(inLocal).toBe('"persisted"');
      expect(inSession).toBeNull();
    });

    test("should persist to sessionStorage when configured", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });

      const component = await mount(
        <StorageTypeComponent
          storageKey="test-session-storage"
          storageType="sessionStorage"
        />,
      );

      await component.getByTestId("set-button").click();
      await page.waitForTimeout(100);

      const inLocal = await page.evaluate(() =>
        localStorage.getItem("test-session-storage"),
      );
      const inSession = await page.evaluate(() =>
        sessionStorage.getItem("test-session-storage"),
      );

      expect(inLocal).toBeNull();
      expect(inSession).toBe('"persisted"');
    });

    test("should restore from sessionStorage on mount", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
        sessionStorage.setItem("test-session-restore", '"from-session"');
      });

      const component = await mount(
        <StorageTypeComponent
          storageKey="test-session-restore"
          storageType="sessionStorage"
        />,
      );

      await expect(component.getByTestId("storage-value")).toHaveText(
        "from-session",
      );
    });

    test("should remove from sessionStorage when reset to default (removeIfDefault=true)", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });

      const component = await mount(
        <StorageTypeComponent
          storageKey="test-session-remove-default"
          storageType="sessionStorage"
        />,
      );

      await component.getByTestId("set-button").click();
      await page.waitForTimeout(100);

      let stored = await page.evaluate(() =>
        sessionStorage.getItem("test-session-remove-default"),
      );
      expect(stored).toBe('"persisted"');

      await component.getByTestId("reset-button").click();
      await page.waitForTimeout(100);

      stored = await page.evaluate(() =>
        sessionStorage.getItem("test-session-remove-default"),
      );
      expect(stored).toBeNull();
    });
  });

  // ===== syncUrl Option =====
  test.describe("syncUrl Option", () => {
    test("should not write to URL when syncUrl=false", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <SyncUrlComponent storageKey="test-no-url" syncUrl={false} />,
      );

      await component.getByTestId("set-button").click();
      await page.waitForTimeout(100);

      const url = page.url();
      expect(url).not.toContain("test-no-url");
    });

    test("should still persist to localStorage when syncUrl=false", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <SyncUrlComponent storageKey="test-no-url-storage" syncUrl={false} />,
      );

      await component.getByTestId("set-button").click();
      await page.waitForTimeout(100);

      const stored = await page.evaluate(() =>
        localStorage.getItem("test-no-url-storage"),
      );
      expect(stored).toBe('"updated"');
    });

    test("should not read from URL on init when syncUrl=false", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());
      await page.goto("/?test-no-url-init=%22from-url%22");

      const component = await mount(
        <SyncUrlComponent storageKey="test-no-url-init" syncUrl={false} />,
      );

      // URL value must be ignored — should fall back to default
      await expect(component.getByTestId("sync-url-value")).toHaveText(
        "initial",
      );
    });

    test("should write to URL by default (syncUrl=true)", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <SyncUrlComponent storageKey="test-with-url" syncUrl={true} />,
      );

      await component.getByTestId("set-button").click();
      await page.waitForTimeout(100);

      const url = page.url();
      expect(url).toContain("test-with-url");
    });
  });

  // ===== Cleanup =====
  test.afterEach(async ({ page }) => {
    try {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    } catch {
      // Page may have crashed or closed, ignore
    }
  });
});
