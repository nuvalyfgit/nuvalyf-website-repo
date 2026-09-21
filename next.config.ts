import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stop `next dev` from regenerating AGENTS.md / CLAUDE.md in the project root.
  agentRules: false,
};

export default nextConfig;
