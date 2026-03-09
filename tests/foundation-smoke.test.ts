import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("foundation smoke", () => {
  it("keeps the expected project scaffold", () => {
    const rootDir = process.cwd();
    const packageJson = JSON.parse(
      readFileSync(path.join(rootDir, "package.json"), "utf8"),
    );
    const layoutSource = readFileSync(
      path.join(rootDir, "src/app/layout.tsx"),
      "utf8",
    );
    const pageSource = readFileSync(
      path.join(rootDir, "src/app/page.tsx"),
      "utf8",
    );
    const shellSource = readFileSync(
      path.join(rootDir, "src/components/shared/app-shell.tsx"),
      "utf8",
    );

    expect(packageJson.scripts.dev).toBe("next dev");
    expect(packageJson.scripts.build).toBe("next build");
    expect(packageJson.scripts.lint).toBe("eslint");

    [
      "src/app",
      "src/components/shared",
      "src/components/ui",
      "src/entities",
      "src/features",
      "src/lib",
      "src/providers",
    ].forEach((targetPath) => {
      expect(existsSync(path.join(rootDir, targetPath))).toBe(true);
    });

    expect(layoutSource).toMatch(/lang="pt-BR"/);
    expect(layoutSource).toMatch(/title:\s*"Lista de Mercado"/);
    expect(pageSource).toMatch(/<AppShell \/>/);
    expect(layoutSource).toMatch(/Lista de Mercado/);
    expect(shellSource).toMatch(/CatalogBrowser/);
  });
});
