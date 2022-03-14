import Head from "next/head";
import Link from "next/link";

export function DashboardPage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      <main>
        <h1>Dashboard Page</h1>
        <Link href="/" passHref>
          {"<-"} Go back
        </Link>
      </main>
    </div>
  );
}
