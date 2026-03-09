import { Resvg } from "@resvg/resvg-js";

const normalizeFormat = (format) =>
  typeof format === "string" ? format.toLowerCase() : "";

const isSvgFormat = (format) => normalizeFormat(format) === "svg";

const setImageHeaders = (res, format) => {
  const contentType = isSvgFormat(format) ? "image/svg+xml" : "image/png";
  res.setHeader("Content-Type", contentType);
};

const svgToPng = (svg) => {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
};

const sendImage = (res, svg, format) => {
  if (isSvgFormat(format)) {
    return res.send(svg);
  }
  return res.send(svgToPng(svg));
};

export { sendImage, setImageHeaders };
