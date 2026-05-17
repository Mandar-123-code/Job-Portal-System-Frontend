// Shared job search constants & helpers
// Predefined lists to always show options even if no jobs exist currently
export const POPULAR_COMPANIES = [
  "Google",
  "Apple",
  "Microsoft",
  "Amazon",
  "Meta",
  "Netflix",
  "Tesla",
  "NVIDIA",
  "Adobe",
  "Salesforce",
  "Intel",
  "AMD",
  "Oracle",
  "IBM",
  "Accenture",
  "TCS",
  "Infosys",
  "Wipro",
  "Cognizant",
  "Capgemini",
  "Deloitte",
  "PwC",
  "EY",
  "KPMG",
  "Uber",
  "Airbnb",
  "Spotify",
  "Stripe",
  "Zoom",
  "Slack",
  "Shopify",
  "Atlassian",
  "Twilio",
  "Dropbox",
  "HubSpot",
  "DocuSign",
  "Pinterest",
  "Snapchat",
  "Twitter",
  "TikTok",
  "SpaceX",
  "Palantir",
  "Snowflake",
  "Databricks",
  "GitHub",
  "GitLab",
  "Figma",
  "Canva",
  "Notion",
  "Linear",
  "OpenAI",
  "Anthropic",
  "Scale AI",
  "Hugging Face",
  "Vercel",
  "Netlify",
  "Supabase",
  "Prisma",
  "Clerk",
  "Auth0",
  "Cisco",
  "HP",
  "Dell",
  "Lenovo",
  "Samsung",
  "LG",
  "Sony",
  "Panasonic",
  "Siemens",
  "Philips",
  "BMW",
  "Mercedes-Benz",
  "Volkswagen",
  "Ford",
  "Toyota",
  "Honda",
  "Hyundai",
  "General Motors",
  "Boeing",
  "Airbus",
  "Walmart",
  "Target",
  "Costco",
  "Nike",
  "Adidas",
  "Coca-Cola",
  "PepsiCo",
  "McDonald's",
  "Starbucks",
  "Subway",
  "Goldman Sachs",
  "Morgan Stanley",
  "JPMorgan Chase",
  "Bank of America",
  "Citi",
  "Wells Fargo",
  "Visa",
  "Mastercard",
  "American Express",
  "PayPal",
];

export const POPULAR_LOCATIONS = [
  // Remote
  "Remote",
  // USA
  "New York, NY",
  "San Francisco, CA",
  "Los Angeles, CA",
  "Chicago, IL",
  "Seattle, WA",
  "Austin, TX",
  "Boston, MA",
  "Atlanta, GA",
  "Denver, CO",
  "Miami, FL",
  "Dallas, TX",
  "Houston, TX",
  "Philadelphia, PA",
  "Phoenix, AZ",
  "San Diego, CA",
  "San Jose, CA",
  "Portland, OR",
  "Las Vegas, NV",
  "Washington, D.C.",
  // India
  "Bangalore, India",
  "Noida, India",
  "Pune, India",
  "Delhi, India",
  "Mumbai, India",
  "Hyderabad, India",
  "Chennai, India",
  "Gurgaon, India",
  "Kolkata, India",
  "Ahmedabad, India",
  "Jaipur, India",
  "Kochi, India",
  "Trivandrum, India",
  "Indore, India",
  "Chandigarh, India",
  "Coimbatore, India",
  // UK
  "London, UK",
  "Manchester, UK",
  "Birmingham, UK",
  "Leeds, UK",
  "Glasgow, UK",
  "Edinburgh, UK",
  "Bristol, UK",
  "Liverpool, UK",
  "Sheffield, UK",
  "Newcastle, UK",
  // Canada
  "Toronto, ON",
  "Vancouver, BC",
  "Montreal, QC",
  "Calgary, AB",
  "Ottawa, ON",
  "Edmonton, AB",
  "Waterloo, ON",
  "Halifax, NS",
  // Germany
  "Berlin, Germany",
  "Munich, Germany",
  "Frankfurt, Germany",
  "Hamburg, Germany",
  "Stuttgart, Germany",
  "Dusseldorf, Germany",
  // France
  "Paris, France",
  "Lyon, France",
  "Marseille, France",
  "Toulouse, France",
  "Nice, France",
  // Australia
  "Sydney, Australia",
  "Melbourne, Australia",
  "Brisbane, Australia",
  "Perth, Australia",
  "Adelaide, Australia",
  // Japan
  "Tokyo, Japan",
  "Osaka, Japan",
  "Kyoto, Japan",
  "Yokohama, Japan",
  "Fukuoka, Japan",
  // Singapore
  "Singapore, Singapore",
  // Netherlands
  "Amsterdam, Netherlands",
  "Rotterdam, Netherlands",
  "Utrecht, Netherlands",
  "Eindhoven, Netherlands",
  // Ireland
  "Dublin, Ireland",
  "Cork, Ireland",
];

export const getCountryGroup = (loc) => {
  if (!loc) return "International / Other 🌐";
  const l = loc.toLowerCase().trim();
  if (l.includes("remote")) return "Global / Remote 🌎";
  if (
    l.includes("india") ||
    l.includes("bangalore") ||
    l.includes("banglore") ||
    l.includes("noida") ||
    l.includes("pune") ||
    l.includes("delhi") ||
    l.includes("mumbai") ||
    l.includes("hyderabad") ||
    l.includes("chennai") ||
    l.includes("gurgaon") ||
    l.includes("kolkata") ||
    l.includes("ahmedabad") ||
    l.includes("jaipur") ||
    l.includes("kochi")
  ) {
    return "India 🇮🇳";
  }
  if (
    l.includes("japan") ||
    l.includes("tokyo") ||
    l.includes("osaka") ||
    l.includes("kyoto")
  ) {
    return "Japan 🇯🇵";
  }
  if (
    l.includes("usa") ||
    l.includes("united states") ||
    l.endsWith(", ny") ||
    l.endsWith(", ca") ||
    l.endsWith(", il") ||
    l.endsWith(", wa") ||
    l.endsWith(", tx") ||
    l.endsWith(", ma") ||
    l.endsWith(", ga") ||
    l.endsWith(", co") ||
    l.endsWith(", fl") ||
    l.endsWith(", pa") ||
    l.endsWith(", az") ||
    l.endsWith(", or") ||
    l.endsWith(", nv") ||
    l.endsWith(", dc") ||
    l.includes("new york") ||
    l.includes("san francisco") ||
    l.includes("los angeles") ||
    l.includes("chicago") ||
    l.includes("seattle") ||
    l.includes("austin")
  ) {
    return "United States 🇺🇸";
  }
  if (
    l.includes("uk") ||
    l.includes("united kingdom") ||
    l.includes("london") ||
    l.includes("manchester") ||
    l.includes("birmingham") ||
    l.includes("leeds") ||
    l.includes("glasgow") ||
    l.includes("edinburgh")
  ) {
    return "United Kingdom 🇬🇧";
  }
  if (
    l.includes("toronto") ||
    l.includes("canada") ||
    l.includes("on") ||
    l.includes("bc") ||
    l.includes("qc") ||
    l.includes("ab") ||
    l.includes("ns")
  ) {
    return "Canada 🇨🇦";
  }
  if (
    l.includes("germany") ||
    l.includes("berlin") ||
    l.includes("munich") ||
    l.includes("frankfurt") ||
    l.includes("hamburg")
  ) {
    return "Germany 🇩🇪";
  }
  if (
    l.includes("france") ||
    l.includes("paris") ||
    l.includes("lyon") ||
    l.includes("marseille")
  ) {
    return "France 🇫🇷";
  }
  if (
    l.includes("australia") ||
    l.includes("sydney") ||
    l.includes("melbourne") ||
    l.includes("brisbane") ||
    l.includes("perth")
  ) {
    return "Australia 🇦🇺";
  }
  if (l.includes("singapore")) {
    return "Singapore 🇸🇬";
  }
  if (
    l.includes("netherlands") ||
    l.includes("amsterdam") ||
    l.includes("rotterdam")
  ) {
    return "Netherlands 🇳🇱";
  }
  if (l.includes("ireland") || l.includes("dublin") || l.includes("cork")) {
    return "Ireland 🇮🇪";
  }
  return "International / Other 🌐";
};

export const getExperienceLevel = (job) => {
  const t = (job.title || "").toLowerCase();
  const d = (job.description || "").toLowerCase();

  if (
    t.includes("senior") ||
    t.includes("lead") ||
    t.includes("principal") ||
    t.includes("staff") ||
    t.includes("director") ||
    t.includes("architect") ||
    d.includes("senior developer") ||
    d.includes("senior engineer") ||
    (d.includes("years of experience") &&
      (d.includes("5+") || d.includes("8+") || d.includes("10+")))
  ) {
    return "Senior";
  }

  if (
    t.includes("fresher") ||
    t.includes("junior") ||
    t.includes("intern") ||
    t.includes("associate") ||
    t.includes("graduate") ||
    t.includes("entry") ||
    d.includes("fresher") ||
    d.includes("entry level") ||
    d.includes("junior engineer") ||
    d.includes("no experience required")
  ) {
    return "Fresher";
  }

  return "Mid-Level";
};
export function parseJobSearchParams(search) {
  const params = new URLSearchParams(search || "");
  return {
    q: params.get("q") || "",
    location: params.get("location") || "",
    company: params.get("company") || "",
    experience: params.get("experience") || "",
    sort: params.get("sort") || "newest",
  };
}

export function buildJobSearchParams({ q, location, company, experience, sort }) {
  const params = new URLSearchParams();
  if (q?.trim()) params.set("q", q.trim());
  if (location) params.set("location", location);
  if (company) params.set("company", company);
  if (experience) params.set("experience", experience);
  if (sort && sort !== "newest") params.set("sort", sort);
  return params.toString();
}

export function getCompanyLocationLists(jobs = []) {
  const dynamicCompanies = jobs.map((j) => j.company).filter(Boolean);
  const companies = [...new Set([...POPULAR_COMPANIES, ...dynamicCompanies])].sort();
  const dynamicLocations = jobs.map((j) => j.location).filter(Boolean);
  const locations = [...new Set([...POPULAR_LOCATIONS, ...dynamicLocations])].sort();
  return { companies, locations };
}

const COUNTRY_ORDER = {
  "Global / Remote 🌎": 1, "India 🇮🇳": 2, "United States 🇺🇸": 3,
  "United Kingdom 🇬🇧": 4, "Canada 🇨🇦": 5, "Germany 🇩🇪": 6,
  "France 🇫🇷": 7, "Australia 🇦🇺": 8, "Japan 🇯🇵": 9,
  "Singapore 🇸🇬": 10, "Netherlands 🇳🇱": 11, "Ireland 🇮🇪": 12,
  "International / Other 🌐": 13,
};

export function groupLocations(filteredLocationsList) {
  const groups = {};
  filteredLocationsList.forEach((loc) => {
    const country = getCountryGroup(loc);
    if (!groups[country]) groups[country] = [];
    groups[country].push(loc);
  });
  return Object.keys(groups)
    .sort((a, b) => (COUNTRY_ORDER[a] || 99) - (COUNTRY_ORDER[b] || 99))
    .map((key) => ({ country: key, items: groups[key] }));
}
