import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Stop `next dev` from regenerating AGENTS.md / CLAUDE.md in the project root.
  agentRules: false,
  async redirects() {
    return [
      { source: "/pricing", destination: "/contact?topic=pricing", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/resources", destination: "/blogs", permanent: true },
      { source: "/resources/:slug", destination: "/blogs/:slug", permanent: true },
    ];
  },
};

export default withPayload(nextConfig);
