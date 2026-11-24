import type { Metadata } from "next";
import { ArrowLeft, BellRing, CalendarCheck2, Check, ClipboardList, FileText, Mail, MessageCircle, Phone, Plus, Receipt, Search, ShieldCheck, Stethoscope, UsersRound } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { LiveTicket } from "@/components/docconnect-section";
import { FaqJsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { contact, docconnect, emrSignInUrl } from "@/data/site-content";

// Arabic copy: to be reviewed by a native speaker before launch.
export const metadata: Metadata = {
  title: "نظام إدارة العيادات والحجز الإلكتروني",
  description: "نوفاليف EMR لإدارة عيادتك، ودوك كونكت لحجز المواعيد عبر الإنترنت مع طابور مباشر. للإمارات والهند.",
  alternates: { canonical: "/ar", languages: { en: "/", ar: "/ar", "x-default": "/" } },
};

const nav = [
  ["المنتجات", "#products"],
  ["دوك كونكت", "#docconnect"],
  ["الأسئلة الشائعة", "#faq"],
  ["تواصل معنا", "#contact"],
];

const emrFeatures = [
  { Icon: UsersRound, t: "ملفات المرضى", d: "التسجيل والتاريخ الطبي والحساسية في ملف واحد واضح." },
  { Icon: ClipboardList, t: "المواعيد والطابور المباشر", d: "الحجوزات والزيارات المباشرة في طابور واحد منظم." },
  { Icon: Stethoscope, t: "السجل الطبي الإلكتروني", d: "العلامات الحيوية والتشخيص والملاحظات في استشارة سريعة." },
  { Icon: FileText, t: "الوصفات الطبية الرقمية", d: "وصفات احترافية مع تعليمات الجرعات وملف PDF جاهز." },
  { Icon: Receipt, t: "الفواتير والمدفوعات", d: "فواتير ومدفوعات مرتبطة بكل زيارة." },
  { Icon: ShieldCheck, t: "أمان البيانات", d: "صلاحيات حسب الدور، وفصل بيانات العيادات، وسجل تدقيق ونسخ احتياطي." },
];

const steps = [
  { Icon: Search, t: "المريض يحجز", d: "عبر دوك كونكت أو رابط الطبيب الخاص." },
  { Icon: ClipboardList, t: "يصل إلى النظام", d: "يظهر الحجز في طابور العيادة مباشرة." },
  { Icon: Stethoscope, t: "الطبيب يعاين", d: "الملاحظات والوصفة في نظام نوفاليف." },
  { Icon: BellRing, t: "يعود إلى المريض", d: "الوصفة وموعد المتابعة في تطبيق المريض." },
];

const faqs: [string, string][] = [
  ["من يملك بيانات العيادة؟", "أنت. تبقى جميع السجلات تحت سيطرة عيادتك ويمكن تصديرها في أي وقت مع المستندات الأصلية."],
  ["هل يمكن نقل بياناتنا من نظام آخر؟", "نعم. نستورد المرضى والتاريخ الطبي من ملفات Excel أو CSV ونساعد فريقك في الانتقال."],
  ["كم يستغرق الإعداد؟", "معظم العيادات تبدأ خلال أسبوع: إعداد الحساب، استيراد البيانات، تدريب الفريق، ثم التشغيل."],
  ["هل أحتاج إلى النظامين معاً؟", "لا. استخدم نظام EMR وحده، أو دوك كونكت مع نظامك الحالي، أو الاثنين معاً كباقة واحدة."],
  ["هل تدعمون الإمارات؟", "نعم. نخدم العيادات في الإمارات والهند، مع دعم العملة المحلية والضرائب وأرقام الهواتف."],
  ["هل يوجد تدريب ودعم؟", "نعم. التدريب مشمول عند الإعداد، والدعم متاح عبر واتساب والهاتف والبريد الإلكتروني."],
];

export default function ArabicHome() {
  return (
    <div dir="rtl" lang="ar" style={{ fontFamily: "'Segoe UI', Tahoma, 'Noto Sans Arabic', 'Geeza Pro', sans-serif" }}>
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0B1120]/85 backdrop-blur-xl">
        <div className="site-container flex h-[76px] items-center justify-between gap-4">
          <BrandLogo inverse />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
            {nav.map(([l, h]) => <a key={h} href={h} className="text-sm font-semibold text-white/65 transition hover:text-white">{l}</a>)}
          </nav>
          <div className="flex items-center gap-4">
            <a href="/" lang="en" className="text-sm font-semibold text-white/70 hover:text-white">English</a>
            <a href={emrSignInUrl} className="hidden text-sm font-semibold text-white/70 hover:text-white sm:inline">تسجيل الدخول</a>
            <a href="#contact" className="hidden rounded-full bg-[#14B8A6] px-5 py-2.5 text-sm font-bold text-[#042F2E] hover:bg-[#2DD4BF] sm:inline">احجز عرضاً</a>
          </div>
        </div>
      </header>

      <main>
        <FaqJsonLd items={faqs} />
        <section className="nv-hero relative py-20 text-white sm:py-28">
        <div className="nv-aurora"><span /><span /><span /></div>
        <div className="nv-grid" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_20%_10%,rgba(20,184,166,0.18),transparent_60%),radial-gradient(50%_45%_at_90%_85%,rgba(5,150,105,0.14),transparent_62%)]" />
          <div className="site-container relative grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-2 text-xs font-bold text-[#99F6E4]">
                <span className="rounded-full bg-[#14B8A6] px-2 py-0.5 text-[10px] font-black text-[#042F2E]">قريباً</span> دوك كونكت: حجز إلكتروني مع طابور مباشر
              </span>
              <h1 className="mt-7 text-5xl font-bold leading-[1.25] sm:text-6xl">
                أدِر عيادتك.
                <br />
                <span className="bg-[linear-gradient(100deg,#14B8A6_0%,#5EEAD4_38%,#6EE7B7_100%)] bg-clip-text text-transparent">واملأها بالمرضى.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
                نوفاليف EMR يجمع السجلات والطابور والوصفات والفواتير في منصة واحدة آمنة. ودوك كونكت يتيح للمرضى الحجز عبر الإنترنت ومتابعة دورهم مباشرة. استخدمهما معاً، أو اربط دوك كونكت بنظامك الحالي.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#14B8A6] px-8 font-bold text-[#042F2E] hover:bg-[#2DD4BF]">احجز عرضاً توضيحياً <ArrowLeft className="h-4 w-4" /></a>
                <a href={docconnect.earlyAccessUrl} className="inline-flex h-13 items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-8 font-semibold hover:bg-white/10">سجّل للوصول المبكر</a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
                {["أكثر من 50 عيادة", "الإمارات والهند", "بياناتك تحت سيطرتك"].map((t) => <span key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#14B8A6]" />{t}</span>)}
              </div>
            </div>
            <div dir="ltr"><LiveTicket /></div>
          </div>
        </section>

        <section id="products" className="bg-white py-14 sm:py-16">
          <div className="site-container">
            <p className="text-sm font-bold text-[#047857]">منتجان، منصة واحدة</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0F172A]">كل ما تحتاجه عيادتك.</h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {emrFeatures.map(({ Icon, t, d }) => (
                <div key={t} className="rounded-[22px] border border-[#E2E8F0] bg-[#F8FAFC] p-6">
                  <Icon className="h-6 w-6 text-[#059669]" />
                  <h3 className="mt-5 text-lg font-bold text-[#0F172A]">{t}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#64748B]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="docconnect" className="bg-[#F8FAFC] py-14 sm:py-16">
          <div className="site-container">
            <p className="text-sm font-bold text-[#047857]">دوك كونكت</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0F172A]">رحلة مريض واحدة، من الحجز إلى الوصفة.</h2>
            <ol className="mt-12 grid gap-4 md:grid-cols-4">
              {steps.map(({ Icon, t, d }, i) => (
                <li key={t} className="rounded-[22px] border border-[#E2E8F0] bg-white p-6">
                  <span className="text-xs font-bold text-[#94A3B8]">0{i + 1}</span>
                  <span className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-[#059669] text-white"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-base font-bold text-[#0F172A]">{t}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#64748B]">{d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="rounded-[26px] bg-[linear-gradient(160deg,#0F172A_0%,#084b45_100%)] p-8 text-white">
                <p className="text-xs font-bold text-[#99F6E4]">الباقة الكاملة</p>
                <h3 className="mt-3 text-2xl font-bold">نوفاليف EMR + دوك كونكت</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">أدِر العيادة واستقبل الحجوزات الإلكترونية في منصة واحدة متصلة.</p>
              </div>
              <div className="rounded-[26px] border border-[#E2E8F0] bg-white p-8">
                <p className="text-xs font-bold text-[#047857]">لديك نظام بالفعل؟</p>
                <h3 className="mt-3 text-2xl font-bold text-[#0F172A]">دوك كونكت وحده</h3>
                <p className="mt-3 text-sm leading-7 text-[#64748B]">احتفظ بنظامك الحالي. يتصل دوك كونكت به لتصل الحجوزات إلى حيث يعمل فريقك.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-14 sm:py-16">
          <div className="site-container max-w-3xl">
            <h2 className="text-4xl font-bold text-[#0F172A]">الأسئلة الشائعة</h2>
            <div className="mt-10 divide-y divide-[#E2E8F0] rounded-[24px] border border-[#E2E8F0]">
              {faqs.map(([q, a]) => (
                <details key={q} className="group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#0F172A] [&::-webkit-details-marker]:hidden">
                    {q}<Plus className="h-5 w-5 shrink-0 text-[#059669] transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-[15px] leading-8 text-[#475569]">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#F1F5F9] py-14 sm:py-16">
          <div className="site-container max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-[#0F172A]">لنحدّث عيادتك معاً.</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#475569]">تواصل معنا عبر واتساب أو الهاتف أو البريد الإلكتروني، وسنعرض لك النظام بما يناسب طريقة عملك.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="rounded-[22px] bg-[#25d366] p-6 font-bold text-white"><MessageCircle className="mx-auto h-7 w-7" /><span className="mt-3 block">واتساب</span></a>
              <a href="tel:+971544311859" className="rounded-[22px] border border-[#E2E8F0] bg-white p-6 font-bold text-[#0F172A]"><Phone className="mx-auto h-7 w-7 text-[#059669]" /><span className="mt-3 block">الإمارات</span><span dir="ltr" className="text-sm font-medium text-[#64748B]">+971 54 431 1859</span></a>
              <a href={`mailto:${contact.email}`} className="rounded-[22px] border border-[#E2E8F0] bg-white p-6 font-bold text-[#0F172A]"><Mail className="mx-auto h-7 w-7 text-[#059669]" /><span className="mt-3 block">البريد الإلكتروني</span><span className="text-sm font-medium text-[#64748B]">{contact.email}</span></a>
            </div>
            <a href="/#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#059669]"><CalendarCheck2 className="h-4 w-4" />أو احجز موعداً عبر النموذج (بالإنجليزية)</a>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] py-8 text-center text-xs text-white/55">
        © {new Date().getFullYear()} NuvaLyf · <a href="/privacy" className="hover:text-white">سياسة الخصوصية</a> · <a href="/terms" className="hover:text-white">شروط الاستخدام</a>
      </footer>
      <MobileActionBar labels={["اتصال", "واتساب", "احجز عرضاً"]} demoHref="#contact" />
    </div>
  );
}
