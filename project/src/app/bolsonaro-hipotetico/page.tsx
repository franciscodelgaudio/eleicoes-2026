import type { Metadata } from "next";
import BolsonaroHipotetico from "@/components/bolsonaro-hipotetico/BolsonaroHipotetico";

export const metadata: Metadata = {
  title: "Bolsonaro Hipotético · Contraprova",
  description:
    "O que a história das ditaduras e a ciência política dizem sobre as falas, os atos e as promessas da família Bolsonaro.",
};

export default function Page() {
  return <BolsonaroHipotetico />;
}
