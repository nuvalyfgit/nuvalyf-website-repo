import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Stop `next dev` from regenerating AGENTS.md / CLAUDE.md in the project root.
  agentRules: false,
};

export default withPayload(nextConfig);
