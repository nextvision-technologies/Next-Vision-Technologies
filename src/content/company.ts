// Company registration details and official documents, shown on /company-registration.
// Every value below is copied from the government documents in /public/company-docs. Do not round or reword the numbers.

export const company = {
  legalName: "Next Vision Technologies (Private) Limited",
  type: "Private limited company, limited by shares",
  law: "Companies Act, 2017 (XIX of 2017)",
  cuin: "0366776", // SECP Corporate Unique Identification No.
  incorporated: "2026-11-17",
  registrar: "Securities and Exchange Commission of Pakistan (SECP), Business Centre at Head Office Islamabad",
  registeredOffice: "28 Davis Road, Lahore, Punjab, Pakistan",
  ntn: "K680541", // FBR taxpayer registration number
  taxOffice: "Corporate Tax Office (CTO) Lahore",
  taxRegistered: "2026-11-17",
  filingNo: "20261116_45182472",
  secpVerifyUrl: "https://leap.secp.gov.pk/#/verify-company-info/0366776",
  fbrUrl: "https://www.fbr.gov.pk",
};

/**
 * What SECP's public "Verify Company Information" page shows for CUIN 0366776 (checked 2026-11-20).
 * The applicant's CNIC ("Applicant ID") is deliberately left out: it is personal identity data.
 */
export const secpRecord = {
  checked: "2026-11-20",
  rows: [
    { label: "Company name", value: "NEXT VISION TECHNOLOGIES (PRIVATE) LIMITED" },
    { label: "CUIN", value: "0366776" },
    { label: "Applied by", value: "Ali Raza" },
    { label: "Application ID", value: "20261116_45182472" },
    { label: "Issued by", value: "SECP" },
    { label: "Incorporation date", value: "17 Nov 2026" },
    { label: "Company Registration Office (CRO)", value: "Lahore" },
    { label: "Dealing officer", value: "Muhammad Moeen Rajput, Deputy Registrar" },
  ],
};

export type CompanyDocument = {
  slug: string;
  title: string;
  issuer: string;
  reference: string;
  date: string; // ISO
  summary: string;
  image: string; // /public path, A4 portrait (about 2480x3508)
};

export const companyDocuments: CompanyDocument[] = [
  {
    slug: "certificate-of-incorporation",
    title: "Certificate of Incorporation",
    issuer: "Securities and Exchange Commission of Pakistan (SECP)",
    reference: "CUIN 0366776",
    date: "2026-11-17",
    summary: "Certifies that Next Vision Technologies (Private) Limited is incorporated under section 16 of the Companies Act, 2017 as a company limited by shares. It carries the SECP Registrar's seal and a QR code that links to the SECP verification page.",
    image: "/company-docs/secp-certificate-of-incorporation.webp",
  },
  {
    slug: "taxpayer-registration-certificate",
    title: "Taxpayer Registration Certificate",
    issuer: "Federal Board of Revenue (FBR), Inland Revenue Service",
    reference: "Registration No. K680541",
    date: "2026-11-17",
    summary: "Our national tax registration with the FBR under section 181C of the Income Tax Ordinance, 2001, listing the company as a registered taxpayer with the Corporate Tax Office Lahore.",
    image: "/company-docs/fbr-taxpayer-registration-certificate.webp",
  },
  {
    slug: "acknowledgement-of-filing",
    title: "Acknowledgement of Filing",
    issuer: "Securities and Exchange Commission of Pakistan (SECP)",
    reference: "No. 20261116_45182472",
    date: "2026-11-17",
    summary: "SECP's confirmation that our incorporation application, Memorandum of Association and Articles of Association were filed, registered and recorded under the Companies Act, 2017.",
    image: "/company-docs/secp-acknowledgement-of-filing.webp",
  },
];

/** What being a registered company means for clients */
export const registrationPromises = [
  { title: "A real, accountable legal entity", text: "You sign contracts with a company registered with the SECP, not an individual freelancer. Our legal name and registration number appear on every agreement." },
  { title: "Proper invoices and tax compliance", text: "We are registered with the FBR, so every invoice is issued in our company name with our tax registration number, ready for your accounts." },
  { title: "A registered office you can visit", text: "Our registered office is at 28 Davis Road, Lahore. Meetings can be arranged in person or online." },
  { title: "Clear contracts and ownership", text: "Scope, payment milestones and ownership of the code and designs are written into a signed agreement before work starts." },
];

export const companyFaqs = [
  { q: "Is Next Vision Technologies a registered company?", a: "Yes. Next Vision Technologies (Private) Limited is incorporated with the Securities and Exchange Commission of Pakistan under the Companies Act, 2017, with Corporate Unique Identification No. 0366776, and is registered with the Federal Board of Revenue under registration No. K680541." },
  { q: "How can I verify your registration myself?", a: "Open the SECP verification link on this page, or scan the QR code on our Certificate of Incorporation. Both open SECP's official record for CUIN 0366776. You can also confirm our tax registration with the FBR using registration No. K680541." },
  { q: "Will I receive an official invoice?", a: "Yes. Every project and monthly package is invoiced in the name of Next Vision Technologies (Private) Limited, with our registration details." },
  { q: "Do you ever ask for job fees or investment deposits?", a: "Never. We do not charge fees for jobs or internships and we do not take deposits or offer investment schemes. If anyone asks you for money in our name for these reasons, please contact us straight away." },
];
