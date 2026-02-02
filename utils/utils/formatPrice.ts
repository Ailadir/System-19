export default function formatPrice(value: number): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return '';

  const abs = Math.abs(value);
  const s = String(abs);

  const [intPart, fracPart] = s.split('.');

  const intFormatted = abs > 9999 ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : intPart;

  return intFormatted + (fracPart ? ',' + fracPart : '');
}
