/**
 * Represents a rating value as a string, ranging from "1" to "4".
 * - "1": Poor
 * - "2": Fair
 * - "3": Good
 * - "4": Excellent
 *
 * @example
 * const userRating: Rating = "3"; // Valid
 * const invalidRating: Rating = "5"; // ❌ Error: Not allowed
 */
export type Rating = '1' | '2' | '3' | '4';
