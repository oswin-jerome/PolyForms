import { getForm } from "@/actions/forms";
import PolyForm from "./PolyForm";

const PublicPage = async ({ params }: { params: { formId: string } }) => {
  const form = (await getForm(params.formId)).data;
  console.log(form);
  return (
    <main className="bg-slate-300 min-h-screen">
      <PolyForm form={form}></PolyForm>
    </main>
  );
};

export default PublicPage;
