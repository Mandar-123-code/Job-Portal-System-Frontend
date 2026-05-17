import { useMemo, useState } from "react";
import {
  getCompanyLocationLists,
  groupLocations,
} from "../utils/jobSearchData";

const EXPERIENCE_OPTIONS = [
  { value: "", label: "All Experiences" },
  { value: "Fresher", label: "Entry-Level / Fresher 🎓" },
  { value: "Mid-Level", label: "Mid-Level Engineer 💻" },
  { value: "Senior", label: "Senior / Tech Lead 👑" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Date Posted (Newest First)" },
  { value: "oldest", label: "Date Posted (Oldest First)" },
  { value: "salary_high", label: "Salary (High to Low)" },
  { value: "salary_low", label: "Salary (Low to High)" },
];

function Chevron({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function JobSearchBar({
  variant = "panel",
  jobs = [],
  search,
  onSearchChange,
  companyFilter,
  onCompanyFilterChange,
  locationFilter,
  onLocationFilterChange,
  experienceFilter,
  onExperienceFilterChange,
  sortBy,
  onSortByChange,
  onSubmit,
  submitLabel = "Find Jobs",
  className = "",
}) {
  const isHero = variant === "hero";
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [companySearch, setCompanySearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const { companies, locations } = useMemo(
    () => getCompanyLocationLists(jobs),
    [jobs],
  );

  const filteredCompaniesList = useMemo(() => {
    const term = companySearch.toLowerCase().trim();
    if (!term) return companies;
    return companies.filter((c) => c.toLowerCase().includes(term));
  }, [companies, companySearch]);

  const filteredLocationsList = useMemo(() => {
    const term = locationSearch.toLowerCase().trim();
    if (!term) return locations;
    return locations.filter((l) => l.toLowerCase().includes(term));
  }, [locations, locationSearch]);

  const groupedLocations = useMemo(
    () => groupLocations(filteredLocationsList),
    [filteredLocationsList],
  );

  const closeDropdowns = () => {
    setActiveDropdown(null);
    setCompanySearch("");
    setLocationSearch("");
  };

  const toggle = (name) =>
    setActiveDropdown((prev) => (prev === name ? null : name));

  const fieldBtnClass = isHero
    ? "w-full flex items-center justify-between bg-slate-50 border border-slate-200 text-gray-700 rounded-xl pl-4 pr-3 py-3.5 hover:bg-white hover:border-indigo-200 transition-all outline-none cursor-pointer"
    : "w-full flex items-center justify-between bg-gray-50 border border-gray-200 text-gray-700 rounded-xl pl-3 sm:pl-4 pr-3 py-2.5 sm:py-3 hover:bg-slate-100/50 hover:border-slate-300 transition-all outline-none cursor-pointer";

  const inputClass = isHero
    ? "w-full min-w-0 bg-slate-50 border border-slate-200 text-gray-900 rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all font-medium text-sm sm:text-base"
    : "w-full min-w-0 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all font-medium text-sm sm:text-base";

  const dropdownZ = (name) =>
    `relative w-full min-w-0 ${activeDropdown === name ? "z-30" : "z-20"}`;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  const sortShortLabel =
    sortBy === "newest"
      ? "Newest"
      : sortBy === "oldest"
        ? "Oldest"
        : sortBy === "salary_high"
          ? "Salary ↓"
          : "Salary ↑";

  const sortLongLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label?.replace(" First", "") ||
    "Date Posted (Newest)";

  const content = (
    <>
      {activeDropdown && (
        <div className="fixed inset-0 z-10" onClick={closeDropdowns} aria-hidden="true" />
      )}

      <div
        className={
          isHero
            ? "space-y-3 sm:space-y-4"
            : "flex flex-col xl:flex-row xl:items-stretch gap-3 sm:gap-4"
        }
      >
        {/* Keyword search */}
        <div className={isHero ? "relative w-full z-20" : "relative w-full min-w-0 xl:flex-1 xl:min-w-[200px] xl:max-w-md z-20"}>
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={isHero ? "Job title, keywords, or company" : "Search jobs, keywords..."}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
            className={inputClass}
          />
        </div>

        <div
          className={
            isHero
              ? "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              : "grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full min-w-0 xl:flex-[2]"
          }
        >
          {/* Company */}
          <div className={dropdownZ("company")}>
            <button type="button" onClick={() => toggle("company")} className={fieldBtnClass}>
              <div className="flex items-center gap-3 min-w-0">
                <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="truncate text-sm font-semibold text-slate-700">
                  {companyFilter || "All Companies"}
                </span>
              </div>
              <Chevron open={activeDropdown === "company"} />
            </button>
            {activeDropdown === "company" && (
              <DropdownPanel>
                <SearchInput value={companySearch} onChange={setCompanySearch} placeholder="Search companies..." />
                <OptionList>
                  <OptionBtn active={!companyFilter} onClick={() => { onCompanyFilterChange(""); closeDropdowns(); }}>All Companies</OptionBtn>
                  {filteredCompaniesList.length === 0 ? (
                    <p className="text-[11px] text-slate-400 text-center py-3">No matching companies</p>
                  ) : (
                    filteredCompaniesList.map((c) => (
                      <OptionBtn key={c} active={companyFilter === c} onClick={() => { onCompanyFilterChange(c); closeDropdowns(); }}>{c}</OptionBtn>
                    ))
                  )}
                </OptionList>
              </DropdownPanel>
            )}
          </div>

          {/* Location */}
          <div className={dropdownZ("location")}>
            <button type="button" onClick={() => toggle("location")} className={fieldBtnClass}>
              <div className="flex items-center gap-3 min-w-0">
                <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate text-sm font-semibold text-slate-700">
                  {locationFilter || "All Locations"}
                </span>
              </div>
              <Chevron open={activeDropdown === "location"} />
            </button>
            {activeDropdown === "location" && (
              <DropdownPanel wide>
                <SearchInput value={locationSearch} onChange={setLocationSearch} placeholder="Search locations..." />
                <OptionList tall>
                  <OptionBtn active={!locationFilter} onClick={() => { onLocationFilterChange(""); closeDropdowns(); }}>All Locations</OptionBtn>
                  {groupedLocations.length === 0 ? (
                    <p className="text-[11px] text-slate-400 text-center py-3">No matching locations</p>
                  ) : (
                    groupedLocations.map((group) => (
                      <div key={group.country} className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-0.5 bg-slate-50/60 rounded">
                          {group.country}
                        </div>
                        <div className="space-y-0.5 pl-1">
                          {group.items.map((l) => (
                            <OptionBtn key={l} active={locationFilter === l} onClick={() => { onLocationFilterChange(l); closeDropdowns(); }} small>
                              {l}
                            </OptionBtn>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </OptionList>
              </DropdownPanel>
            )}
          </div>

          {/* Experience */}
          <div className={dropdownZ("experience")}>
            <button type="button" onClick={() => toggle("experience")} className={fieldBtnClass}>
              <div className="flex items-center gap-3 min-w-0">
                <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="truncate text-sm font-semibold text-slate-700">
                  {experienceFilter ? (
                    experienceFilter
                  ) : (
                    <>
                      <span className="sm:hidden">Experience</span>
                      <span className="hidden sm:inline">All Experiences</span>
                    </>
                  )}
                </span>
              </div>
              <Chevron open={activeDropdown === "experience"} />
            </button>
            {activeDropdown === "experience" && (
              <DropdownPanel>
                <OptionList>
                  {EXPERIENCE_OPTIONS.map((item) => (
                    <OptionBtn
                      key={item.value}
                      active={experienceFilter === item.value}
                      onClick={() => { onExperienceFilterChange(item.value); closeDropdowns(); }}
                    >
                      {item.label}
                    </OptionBtn>
                  ))}
                </OptionList>
              </DropdownPanel>
            )}
          </div>

          {/* Sort */}
          <div className={`${dropdownZ("sort")} ${!isHero ? "min-[480px]:col-span-2 lg:col-span-1" : ""}`}>
            <button type="button" onClick={() => toggle("sort")} className={fieldBtnClass}>
              <div className="flex items-center gap-3 min-w-0">
                <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span className="truncate text-sm font-semibold text-slate-700">
                  <span className="sm:hidden">{sortShortLabel}</span>
                  <span className="hidden sm:inline">{sortLongLabel}</span>
                </span>
              </div>
              <Chevron open={activeDropdown === "sort"} />
            </button>
            {activeDropdown === "sort" && (
              <DropdownPanel>
                <OptionList>
                  {SORT_OPTIONS.map((item) => (
                    <OptionBtn
                      key={item.value}
                      active={sortBy === item.value}
                      onClick={() => { onSortByChange(item.value); closeDropdowns(); }}
                    >
                      {item.label}
                    </OptionBtn>
                  ))}
                </OptionList>
              </DropdownPanel>
            )}
          </div>
        </div>

        {isHero && onSubmit && (
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200/50 hover:shadow-xl transition-all text-base sm:text-lg"
          >
            {submitLabel}
          </button>
        )}
      </div>
    </>
  );

  if (isHero) {
    return (
      <form
        onSubmit={handleFormSubmit}
        className={`relative overflow-visible ${className}`}
      >
        {content}
      </form>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 relative overflow-visible ${className}`}
    >
      {content}
    </div>
  );
}

function DropdownPanel({ children, wide }) {
  return (
    <div
      className={`absolute top-full left-0 right-0 sm:right-auto mt-2 w-full ${wide ? "sm:min-w-[280px]" : "sm:min-w-[260px]"} max-w-full bg-white border border-slate-100 rounded-2xl shadow-xl p-3 z-40`}
    >
      {children}
    </div>
  );
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="relative mb-2">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/80 transition-all font-medium"
      />
      <svg className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}

function OptionList({ children, tall }) {
  return (
    <div className={`${tall ? "max-h-64" : "max-h-60"} overflow-y-auto space-y-0.5 custom-scrollbar`}>
      {children}
    </div>
  );
}

function OptionBtn({ children, active, onClick, small }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left ${small ? "px-2.5 py-1.5" : "px-3 py-2"} rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-between ${
        active ? "text-indigo-600 bg-indigo-50/40" : "text-slate-600"
      }`}
    >
      <span className="truncate">{children}</span>
      {active && <span className="text-indigo-600 font-bold shrink-0 ml-2">✓</span>}
    </button>
  );
}

export default JobSearchBar;
