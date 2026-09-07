"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const images = Array.from(document.images);
    const total = images.length;

    function done() {
      setProgress(100);
      setTimeout(() => setVisible(false), 500);
    }

    if (total === 0) {
      done();
      return;
    }

    let loaded = 0;
    function onLoad() {
      loaded += 1;
      setProgress(Math.floor((100 / total) * loaded));
      if (loaded === total) done();
    }

    images.forEach((img) => {
      if (img.complete) {
        onLoad();
      } else {
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onLoad);
      }
    });
  }, []);

  if (!visible) return null;

  return (
    <div id="loading">
      <div id="loading-center">
        <div id="loading-center-absolute" style={{ width: "90%", maxWidth: "320px" }}>
          <div className="preloader__content text-center">
            <div className="preloader__logo">
                <img
                  src="/assets/griplogo.png"
                  alt="GRIP – The Business Forum"
                className="logo-blink"
                style={{ maxWidth: "180px", width: "100%", height: "auto", display: "block", margin: "0 auto", objectFit: "contain" }}
              />
            </div>
            <div id="st-loading-bar" className="preloader__bar">
              <div
                id="st-loading-line"
                className="preloader__bar-inner"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
