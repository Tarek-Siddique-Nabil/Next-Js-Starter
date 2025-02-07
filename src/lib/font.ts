import { Exo_2, Inter } from "next/font/google";

export const exo_2 = Exo_2({
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-exo2",
});
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});
