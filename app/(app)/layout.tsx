import "@/app/globals.css";
import HeaderComponent from "@/components/shared/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <HeaderComponent
        headerTitle={
          <>
            Questions <span className="text-blue">médicale</span>
            <br />
            hors consultation.
          </>
        }
        subTitle={true}
      />
      {children}
    </section>
  );
}
