import { getForm, getFormPublic } from "@/actions/forms";
import PolyForm from "./PolyForm";
import { Metadata, ResolvingMetadata } from "next";

// export const metadata: Metadata = {
//   title: "PolyForm",
//   openGraph: {
//     images: ["https://url2image.oswinjerome.in/screenshot?url=https://forms.oswinjerome.in/public/"],
//   },
// };

export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const form = (await getFormPublic(params.formId)).data;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: form.title,
    openGraph: {
      images: ["https://url2image.oswinjerome.in/screenshot?url=https://forms.oswinjerome.in/public/" + form.id],
    },
  };
}

const PublicPage = async ({ params }: { params: { formId: string } }) => {
  const form = (await getFormPublic(params.formId)).data;
  console.log(form);
  return (
    <main className="bg-slate-300 min-h-screen">
      <PolyForm form={form}></PolyForm>
    </main>
  );
};

export default PublicPage;
