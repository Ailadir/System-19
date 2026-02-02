export const extractPriceFromMask = (maskRef: { unmaskedValue: string }): number => {
  return maskRef.unmaskedValue ? Number(maskRef.unmaskedValue) : 0;
};
