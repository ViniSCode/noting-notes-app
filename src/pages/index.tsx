import Editor from "@/components/Editor/index";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { FiFileText, FiTrash } from "react-icons/fi";

export default function Home({ session }: any) {
  return (
    <div className="min-h-full text-zinc-50">
      <div className="mx-auto overflow-hidden w-full shadow-md bg-zinc-800 border-black/20 break-words grid grid-cols-[16rem_1fr]">
        <div className="overflow-hidden bg-zinc-900 border-r border-r-zinc-700">
          <aside className="fixed w-[16rem] ">
            <div className="flex gap-4 group items-center px-6 py-6">
              <img
                src="https://github.com/viniscode.png"
                alt="Vinícius Rodrigues"
                className="rounded w-6 h-6"
              />
              <span className="">Vinícius's Notes</span>
            </div>
            <div>
              <div className="mt-6 gap-2 flex justify-between items-center text-sm cursor-pointer hover:bg-zinc-700 px-6 py-2 text-zinc-400">
                <div className="flex gap-2 items-center">
                  <FiFileText className="w-4 h-4" />
                  <span>TailwindCSS</span>
                </div>
                <FiTrash className="w-4 h-4" />
              </div>
            </div>
          </aside>
        </div>
        <main className="px-8 py-4">
          <Editor />
        </main>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
