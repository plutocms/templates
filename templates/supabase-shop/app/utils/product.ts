/** The images of a product, in their order. A 3D model or another file is not in it. */
export function productImages(product: PublicProduct): PlutoPublicMedia[] {
  return product.media.filter(isMediaImage);
}

/**
 * The 3D models of a product (`.glb`). The `@plutocms/3d` add-on lets the admin upload them and
 * shows them with `Pluto3dViewer`.
 */
export function productModels(product: PublicProduct): PlutoPublicMedia[] {
  return product.media.filter((file) => file.mimeType === "model/gltf-binary");
}

/** True when a product that is not made to order has no stock. */
export function isSoldOut(product: PublicProduct): boolean {
  return !product.is_custom && product.stock_quantity <= 0;
}
