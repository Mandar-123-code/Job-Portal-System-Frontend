const SIZE_MAP = {
  sm: { ring: "w-5 h-5", dot: "w-1 h-1", text: "text-xs", gap: "gap-2" },
  md: { ring: "w-11 h-11", dot: "w-1.5 h-1.5", text: "text-sm", gap: "gap-3" },
  lg: { ring: "w-16 h-16", dot: "w-2 h-2", text: "text-base", gap: "gap-4" },
};

export function LoaderSpinner({ size = "md", className = "" }) {
  const s = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div className={`relative ${s.ring} ${className}`} aria-hidden="true">
      <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500 opacity-30 blur-md loader-glow`} />
      <div
        className={`absolute inset-0 rounded-full border-2 border-indigo-100/80 ${s.ring}`}
      />
      <div
        className={`absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-600 border-r-purple-500 loader-spin ${s.ring}`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 ${size === "sm" ? "w-1.5 h-1.5" : size === "lg" ? "w-3 h-3" : "w-2 h-2"}`} />
      </div>
    </div>
  );
}

export function ButtonLoader({ text = "Loading..." }) {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      <LoaderSpinner size="sm" />
      <span>{text}</span>
    </span>
  );
}

function CardSkeleton({ tall = false }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse shrink-0" />
          <div className="flex-1 space-y-2 min-w-0">
            <div className="h-4 bg-slate-100 rounded-lg w-4/5 max-w-[200px] animate-pulse" />
            <div className="h-3 bg-slate-100 rounded-lg w-1/2 max-w-[120px] animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-50 rounded w-full animate-pulse" />
          <div className="h-3 bg-slate-50 rounded w-5/6 animate-pulse" />
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <div className="h-6 w-16 rounded-full bg-indigo-50 animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-slate-100 animate-pulse" />
          <div className="h-6 w-14 rounded-full bg-slate-100 animate-pulse" />
        </div>
        {tall && (
          <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
            <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
            <div className="h-8 w-24 bg-indigo-50 rounded-xl animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

function Loader({
  variant = "section",
  message = "Loading...",
  size = "md",
  count = 3,
  className = "",
}) {
  const s = SIZE_MAP[size] || SIZE_MAP.md;

  if (variant === "inline") {
    return (
      <div
        className={`inline-flex items-center ${s.gap} text-slate-500 ${s.text} ${className}`}
        role="status"
        aria-live="polite"
        aria-label={message}
      >
        <LoaderSpinner size={size} />
        {message && <span>{message}</span>}
      </div>
    );
  }

  if (variant === "skeleton" || variant === "cards") {
    return (
      <div className={`space-y-4 ${className}`} role="status" aria-label={message}>
        <div className="flex items-center justify-center gap-3 py-2">
          <LoaderSpinner size="sm" />
          <span className={`${s.text} font-medium text-slate-500`}>{message}</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: count }, (_, i) => (
            <CardSkeleton key={i} tall={variant === "cards"} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={className} role="status" aria-label={message}>
        <div className="flex flex-col items-center justify-center py-8 sm:py-12">
          <LoaderSpinner size="lg" />
          <p className={`mt-5 ${SIZE_MAP.lg.text} font-semibold text-slate-700`}>{message}</p>
          <div className="flex items-center gap-1.5 mt-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400 loader-dot"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {Array.from({ length: count }, (_, i) => (
            <CardSkeleton key={i} tall />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-[50vh] py-16 px-4 ${className}`}
        role="status"
        aria-live="polite"
        aria-label={message}
      >
        <LoaderSpinner size="lg" />
        <p className={`mt-6 ${SIZE_MAP.lg.text} font-semibold text-slate-800 text-center`}>
          {message}
        </p>
        <p className="mt-2 text-sm text-slate-400 text-center max-w-xs">
          Please wait a moment
        </p>
        <div className="flex items-center gap-1.5 mt-5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 loader-dot"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // section (default)
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 sm:py-16 px-4 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <LoaderSpinner size={size} />
      {message && (
        <p className={`mt-4 ${s.text} font-semibold text-slate-600 text-center`}>{message}</p>
      )}
      <div className="flex items-center gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`${s.dot} rounded-full bg-indigo-400 loader-dot`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Loader;
