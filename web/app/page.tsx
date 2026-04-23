import { redirect } from "next/navigation";
import { defaultLocale } from "./lib/locale";

/**
 * Root landing page. Hard-redirect to the KSA-first default locale. Real
 * Accept-Language negotiation can land once the v0.2.0 web foundation is
 * hardened; today we bias to Arabic deliberately.
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
