interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ children, subtitle, className = "" }: SectionTitleProps) {
  return (
    <div>
      <div className="section-header">
        <span className="section-dot" aria-hidden="true" />
        <h2 className={`section-title ${className}`}>
          {children}
        </h2>
      </div>
      {subtitle && (
        <p className="section-subtitle">{subtitle}</p>
      )}
    </div>
  );
}
