import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of Use" };

// DRAFT: to be reviewed by NuvaLyf's legal advisor before going live.
export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="November 2026"
      sections={[
        ["Using this website", "This website describes NuvaLyf EMR and DocConnect. You may use it to learn about our products and contact us. Do not misuse it, attempt to break its security, or submit false information."],
        ["Our products", "Use of NuvaLyf EMR and DocConnect is governed by the agreement signed between NuvaLyf and each clinic or hospital. Those terms take priority over this page."],
        ["Not medical advice", "Content on this website is for information about our software only. It is not medical advice. In an emergency, contact your local emergency services."],
        ["Intellectual property", "The NuvaLyf name, logo, product designs and website content belong to NuvaLyf. Please do not copy them without permission."],
        ["Liability", "We work to keep this website accurate and available, but it is provided as is. To the extent the law allows, we are not liable for losses arising from its use."],
        ["Changes", "We may update these terms. The date at the top shows the latest version."],
      ]}
    />
  );
}
