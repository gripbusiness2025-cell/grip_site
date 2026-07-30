import Link from "next/link";

interface BreadcrumbProps {
  title: string;
}

export default function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <section
      className="si__breadcumb__area bg"
      style={{ background: "url(/assets/images/breadcumb/Hero.png)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="si__breadcumb__text text-center">
              <h1>{title}</h1>
              <span>
                <Link href="/">Home</Link>{" "}
                <i className="fa-regular fa-chevron-right"></i> {title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
