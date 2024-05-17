import HeroComponent from "@/components/layout/Hero";

export default function Home() {
  return (
    <div>
      <HeroComponent />
      <section className="pb-20 lg:mt-14 px-6">
        <img
          src="/bg.png"
          alt="bg of project"
          className="mx-auto w-full lg:max-w-5xl rounded-xl shadow-xl"
        />
      </section>
    </div>
  );
}
