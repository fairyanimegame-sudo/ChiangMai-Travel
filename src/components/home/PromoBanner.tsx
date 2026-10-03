type PromoBannerProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

export default function PromoBanner({
  icon,
  title,
  description,
  href,
}: PromoBannerProps) {
  return (
    <a href={href}>
      <div>
        <span>{icon}</span>

        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </a>
  );
}