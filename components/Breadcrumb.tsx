import Link from "next/link";

interface BreadcrumbProps {
  title: string;
  backgroundImage?: string;
}

export default function Breadcrumb({ title, backgroundImage }: BreadcrumbProps) {
  const bg = backgroundImage || "/assets/images/breadcumb/Hero.png";
  const isCustom = Boolean(backgroundImage);

  return (
    <>
      <section
        className={`si__breadcumb__area bg${isCustom ? " si__breadcumb__area--tall" : ""}`}
        style={{
          background: isCustom
            ? `linear-gradient(rgba(18, 18, 18, 0.55), rgba(18, 18, 18, 0.55)), url(${bg}) center/cover no-repeat`
            : `url(${bg})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="si__breadcumb__text text-center"
                style={isCustom ? { color: "#fff" } : undefined}
              >
                <h1 style={isCustom ? { color: "#fff" } : undefined}>{title}</h1>
                <span style={isCustom ? { color: "rgba(255,255,255,0.9)" } : undefined}>
                  <Link
                    href="/"
                    style={isCustom ? { color: "#fff" } : undefined}
                  >
                    Home
                  </Link>{" "}
                  <i className="fa-regular fa-chevron-right"></i> {title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isCustom && (
        <style>{`
          .si__breadcumb__area--tall {
            padding-top: 160px !important;
            padding-bottom: 100px !important;
            min-height: 280px;
            display: flex;
            align-items: center;
          }
          @media (max-width: 991px) {
            .si__breadcumb__area--tall {
              padding-top: 120px !important;
              padding-bottom: 80px !important;
              min-height: 220px;
            }
          }
        `}</style>
      )}
    </>
  );
}
