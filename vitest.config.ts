import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    // Sandcastle creates throwaway git worktrees under .sandcastle/worktrees
    // that contain full copies of the app (and stale native binaries like
    // better-sqlite3). Excluding the directory keeps test discovery — both the
    // CLI and the Vitest VS Code extension — from scanning and failing on them.
    exclude: [...configDefaults.exclude, ".sandcastle/**"],
  },
});
