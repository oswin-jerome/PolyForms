import { getForms } from "@/actions/forms";
import FromCard from "@/components/FormCard";
import Link from "next/link";

const AppPage = async () => {
  const forms = (await getForms()).data;
  console.log(forms);
  return (
    <div className="">
      {/* <section className="bg-slate-100 py-10">
        <div className="container">
          <h2 className=" font-semibold text-lg mb-4">Starred Forms</h2>
          <div className="grid grid-cols-4 gap-4"></div>
        </div>
      </section> */}
      <section className=" py-10">
        <div className="container">
          <h2 className=" font-semibold text-lg mb-4">All Forms</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {forms?.map((form) => {
              return (
                <Link href={`/forms/${form.id}`} key={form.id}>
                  <FromCard form={form} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppPage;
