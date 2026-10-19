import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Special image routes embed the transparent cutout of the supplied logo locally. */
export async function brandImageData() {
  const image = await readFile(join(process.cwd(), "public/images/brand/divines-travels-transparent.png"));
  return `data:image/png;base64,${image.toString("base64")}`;
}
