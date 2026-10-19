import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** The supplied artwork is preserved intact; special image routes embed it locally. */
export async function brandImageData() {
  const image = await readFile(join(process.cwd(), "public/images/brand/divines-travels.png"));
  return `data:image/png;base64,${image.toString("base64")}`;
}
