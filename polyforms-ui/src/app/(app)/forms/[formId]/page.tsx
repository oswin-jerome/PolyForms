import { getForm } from "@/actions/forms";
import { ShareButtonComponent } from "@/components/share-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FromBuilder from "./FromBuilder";
import ResponseLayout from "./ResponseLayout";
import SettingsCard from "./Settings";

const FormPage = async ({ params }: { params: { formId: string } }) => {
  const form = (await getForm(params.formId)).data;
  console.log(form);
  return (
    <div className="container pt-10 pb-12">
      <Tabs defaultValue="editor" className="">
        <div className="flex justify-between ">
          <TabsList className="grid grid-cols-3 mb-4 w-[350px]">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <ShareButtonComponent url={"https://forms.oswinjerome.in/public/" + form.id} />
        </div>
        <TabsContent value="editor">
          <FromBuilder form={form} />
        </TabsContent>
        <TabsContent value="responses">
          <ResponseLayout form={form} />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsCard form={form} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormPage;
