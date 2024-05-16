import HeroComponent from "@/components/layout/Hero";
import { userTable } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http/driver";

export default function Home() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const results = db.select().from(userTable);

  console.log(results);

  return (
    <div>
      <HeroComponent />
      <section className="pb-20 lg:mt-12 px-6">
        <img
          src="/bg.png"
          alt="bg of project"
          className="mx-auto w-full lg:max-w-5xl rounded-xl shadow-xl"
        />
      </section>
    </div>
  );
}
