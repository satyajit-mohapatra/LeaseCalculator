
/**
 * Calculates the lease rating based on the 1.25% rule.
 * 
 * @param {number} msrp - Manufacturer's Suggested Retail Price
 * @param {number} monthlyPayment - Monthly lease payment
 * @param {number} downPayment - Total down payment (capital cost reduction)
 * @param {number} termMonths - Lease term in months (default 36)
 * @returns {object} - { ratio, rating, effectivePayment }
 */
export const calculateLeaseDeal = (msrp, monthlyPayment, downPayment = 0, termMonths = 36) => {
  if (!msrp || msrp <= 0) return null;

  const effectiveMonthlyPayment = monthlyPayment + (downPayment / termMonths);
  const ratio = (effectiveMonthlyPayment / msrp) * 100;

  let rating = "POOR";
  let label = "Poor Deal";
  let color = "var(--color-danger)";

  if (ratio <= 1.0) {
    rating = "UNICORN";
    label = "Unicorn Deal 🦄";
    color = "var(--color-success)";
  } else if (ratio <= 1.25) {
    rating = "GOOD";
    label = "Good Deal";
    color = "var(--color-primary)";
  } else {
    rating = "POOR";
    label = "Poor Deal (Buy?)";
    color = "var(--color-danger)";
  }

  return {
    ratio: ratio.toFixed(2),
    rating,
    label,
    color,
    effectivePayment: effectiveMonthlyPayment.toFixed(2)
  };
};
