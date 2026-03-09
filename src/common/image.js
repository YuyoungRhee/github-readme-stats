import path from "path";
import { fileURLToPath } from "url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const normalizeFormat = (format) =>
  typeof format === "string" ? format.toLowerCase() : "";

const isSvgFormat = (format) => normalizeFormat(format) === "svg";

const setImageHeaders = (res, format) => {
  const contentType = isSvgFormat(format) ? "image/svg+xml" : "image/png";
  res.setHeader("Content-Type", contentType);
};

const svgToPng = (svg) => {
  const resvg = new Resvg(svg, {
    font: {
      fontFiles: [path.join(__dirname, "../fonts/Inter.ttf")],
      loadSystemFonts: false,
      defaultFontFamily: "Inter",
      sansSerifFamily: "Inter",
    },
  });
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
};

const sendImage = (res, svg, format) => {
  if (isSvgFormat(format)) {
    return res.send(svg);
  }
  return res.send(svgToPng(svg));
};

export { isSvgFormat, sendImage, setImageHeaders };
