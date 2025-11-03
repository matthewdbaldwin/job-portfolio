// src/components/Portfolio.jsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import portfolioData from "../data/portfolio.js";

const IMAGE_DIMENSIONS = {
  "images/portfolio/plcom.webp": { width: 800, height: 800 },
  "images/portfolio/pjscom.webp": { width: 800, height: 800 },
  "images/portfolio/winwin.webp": { width: 800, height: 800 },
  "images/portfolio/onekey.webp": { width: 800, height: 800 },
  "images/portfolio/Profoundlogic1.webp": { width: 800, height: 800 },
  "images/portfolio/Profoundlogic2.webp": { width: 800, height: 800 },
  "images/portfolio/Profoundlogic2-1.webp": { width: 800, height: 800 },
  "images/portfolio/Profoundlogic2-2.webp": { width: 800, height: 800 },
  "images/portfolio/Profoundlogic-whitepaper.webp": { width: 800, height: 800 },
  "images/portfolio/IQVIA1.webp": { width: 800, height: 800 },
  "images/portfolio/IQVIA2.webp": { width: 800, height: 800 },
  "images/portfolio/IQVIA3.webp": { width: 800, height: 800 },
};

const getImageDimensions = (src) =>
  IMAGE_DIMENSIONS[src] || { width: 800, height: 600 };

const Portfolio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxComponent, setLightboxComponent] = useState(null);
  const [plugins, setPlugins] = useState([]);
  const loaderRef = useRef(null);

  const listA = portfolioData.caseStudies || [];
  const listB = portfolioData.websites || [];

  const slides = useMemo(
    () =>
      listA.map((item) => ({
        src: item.imgurl,
        title: item.name,
        description: item.description,
      })),
    [listA]
  );

  const ensureLightbox = useCallback(async () => {
    if (lightboxComponent) return lightboxComponent;

    if (!loaderRef.current) {
      loaderRef.current = (async () => {
        const [
          { default: Lightbox },
          { default: Captions },
          { default: Thumbnails },
          { default: Zoom },
        ] = await Promise.all([
          import("yet-another-react-lightbox"),
          import("yet-another-react-lightbox/plugins/captions"),
          import("yet-another-react-lightbox/plugins/thumbnails"),
          import("yet-another-react-lightbox/plugins/zoom"),
        ]);

        await Promise.all([
          import("yet-another-react-lightbox/styles.css"),
          import("yet-another-react-lightbox/plugins/captions.css"),
          import("yet-another-react-lightbox/plugins/thumbnails.css"),
        ]);

        setLightboxComponent(() => Lightbox);
        setPlugins([Captions, Thumbnails, Zoom]);

        return Lightbox;
      })().catch((error) => {
        loaderRef.current = null;
        throw error;
      });
    }

    return loaderRef.current;
  }, [lightboxComponent]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    const section = document.getElementById("portfolio");
    if (!section || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ensureLightbox().catch(() => {
              // no-op – graceful failure keeps the portfolio grid usable
            });
            obs.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [ensureLightbox]);

  const handleOpen = useCallback(
    async (event, index) => {
      event.preventDefault();
      setPhotoIndex(index);

      try {
        await ensureLightbox();
        setIsOpen(true);
      } catch (error) {
        setIsOpen(false);
      }
    },
    [ensureLightbox]
  );

  const LightboxComponent = lightboxComponent;

  return (
    <section id="portfolio">
      {/* Samples of Work → Lightbox */}
      <div className="row">
        <div className="twelve columns collapsed">
          <h1>Samples of Work</h1>
          <div id="portfolio-grid-0" className="bgrid-quarters s-bgrid-thirds cf">
            {listA.map((item, index) => (
              <a
                key={item.id}
                href={item.imgurl}
                title={item.name}
                onClick={(event) => handleOpen(event, index)}
              >
                <div className="columns portfolio-item">
                  <div className="item-wrap">
                    <img
                      src={item.imgurl}
                      alt={item.alt}
                      className="item-img"
                      loading="lazy"
                      decoding="async"
                      {...getImageDimensions(item.imgurl)}
                    />
                    <div className="overlay">
                      <div className="portfolio-item-meta">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Websites → Direct links */}
      <div className="row">
        <div className="twelve columns collapsed">
          <h1>Websites</h1>
          <div id="portfolio-grid-1" className="bgrid-quarters s-bgrid-thirds cf">
            {listB.map((item) => (
              <a
                key={item.id}
                href={item.url}
                title={item.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="columns portfolio-item ">
                  <div className="item-wrap">
                    <img
                      src={item.imgurl}
                      alt={item.alt}
                      className="item-img"
                      loading="lazy"
                      decoding="async"
                      {...getImageDimensions(item.imgurl)}
                    />
                    <div className="overlay">
                      <div className="portfolio-item-meta">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {isOpen && LightboxComponent && (
        <LightboxComponent
          open={isOpen}
          index={photoIndex}
          close={() => setIsOpen(false)}
          on={{ view: ({ index }) => setPhotoIndex(index) }}
          slides={slides}
          plugins={plugins}
          captions={{ showToggle: true }}
          thumbnails={{ width: 120, height: 80, border: 1 }}
        />
      )}
    </section>
  );
};

export default Portfolio;
