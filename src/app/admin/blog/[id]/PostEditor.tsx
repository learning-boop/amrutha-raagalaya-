"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import ImageUploader, { type UploadedImage } from "@/components/admin/ImageUploader";
import { savePost, type PostState } from "../actions";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string | null;
  coverId: string | null;
  published: boolean;
};

const field =
  "w-full min-h-12 px-4 rounded-xl border border-line bg-offwhite focus-visible:outline-3 focus-visible:outline-gold";

export default function PostEditor({ post }: { post: Post }) {
  const [state, formAction, pending] = useActionState<PostState, FormData>(savePost, {});
  const [html, setHtml] = useState(post.content);
  const [cover, setCover] = useState<{ url: string | null; id: string | null }>({
    url: post.coverUrl,
    id: post.coverId,
  });

  const editor = useEditor({
    // The editor must not render during SSR.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } } }),
      TiptapImage.configure({ HTMLAttributes: { class: "rounded-xl" } }),
    ],
    content: post.content,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: {
      attributes: { class: "post-body min-h-[360px] px-4 py-3 focus:outline-none" },
    },
  });

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="content" value={html} />
      <input type="hidden" name="coverUrl" value={cover.url ?? ""} />
      <input type="hidden" name="coverId" value={cover.id ?? ""} />

      <div>
        <label htmlFor="title" className="block text-[0.85rem] font-medium mb-1.5">Title</label>
        <input id="title" name="title" defaultValue={post.title} required className={`${field} font-serif text-xl`} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="slug" className="block text-[0.85rem] font-medium mb-1.5">Web address</label>
          <input id="slug" name="slug" defaultValue={post.slug} className={field} />
          <p className="mt-1 text-[0.78rem] text-ink-2">Leave blank to build it from the title.</p>
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-[0.85rem] font-medium mb-1.5">Short summary</label>
          <input id="excerpt" name="excerpt" defaultValue={post.excerpt} className={field} />
          <p className="mt-1 text-[0.78rem] text-ink-2">Shown on the blog list and in search results.</p>
        </div>
      </div>

      <div>
        <span className="block text-[0.85rem] font-medium mb-1.5">Cover image</span>
        <div className="flex flex-wrap items-start gap-4">
          <div className="relative w-40 aspect-[4/3] rounded-xl overflow-hidden border border-line bg-cream-2 grid place-items-center">
            {cover.url ? (
              <Image src={cover.url} alt="" fill sizes="160px" className="object-cover" />
            ) : (
              <span className="text-[0.78rem] text-ink-2">None</span>
            )}
          </div>
          <div className="space-y-2">
            <ImageUploader
              folder="blog"
              label={cover.url ? "Replace cover" : "Choose a cover"}
              onUploaded={(img: UploadedImage) => setCover({ url: img.url, id: img.publicId })}
            />
            {cover.url && (
              <button
                type="button"
                onClick={() => setCover({ url: null, id: null })}
                className="block text-[0.82rem] text-ink-2 hover:text-maroon underline underline-offset-2"
              >
                Remove cover
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <span className="block text-[0.85rem] font-medium mb-1.5">Content</span>
        <div className="rounded-xl border border-line bg-offwhite overflow-hidden">
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <label className="inline-flex items-center gap-2 text-[0.9rem] font-medium">
          <input type="checkbox" name="published" defaultChecked={post.published} className="size-4 accent-[#6A1419]" />
          Published (visible on the website)
        </label>

        <button
          type="submit"
          disabled={pending}
          className="ml-auto inline-flex items-center justify-center min-h-12 px-6 rounded-xl font-semibold text-[0.95rem] bg-maroon text-[#FFF8EC] hover:bg-maroon-2 disabled:opacity-60 transition-colors focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3"
        >
          {pending ? "Saving…" : "Save"}
        </button>
      </div>

      {state.error && <p role="alert" className="text-[0.85rem] text-maroon">{state.error}</p>}
      {state.ok && <p role="status" className="text-[0.85rem] text-gold">{state.ok}</p>}
    </form>
  );
}

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return <div className="h-12 border-b border-line bg-cream/50" />;

  const btn = (active: boolean) =>
    `min-h-9 px-2.5 rounded-lg text-[0.82rem] font-medium transition-colors focus-visible:outline-3 focus-visible:outline-gold ${
      active ? "bg-maroon text-[#FFF8EC]" : "text-ink-2 hover:bg-cream-2 hover:text-maroon"
    }`;

  function addLink() {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link address", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap items-center gap-1 px-2 py-2 border-b border-line bg-cream/50">
      <button type="button" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
      <button type="button" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      <span className="w-px h-5 bg-line mx-1" />
      <button type="button" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
      <button type="button" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
      <span className="w-px h-5 bg-line mx-1" />
      <button type="button" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>List</button>
      <button type="button" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>Numbered</button>
      <button type="button" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}>Quote</button>
      <span className="w-px h-5 bg-line mx-1" />
      <button type="button" className={btn(editor.isActive("link"))} onClick={addLink}>Link</button>
      <ImageUploader
        folder="blog"
        label="Image"
        onUploaded={(img) => editor.chain().focus().setImage({ src: img.url, alt: "" }).run()}
      />
      <span className="ml-auto flex gap-1">
        <button type="button" className={btn(false)} onClick={() => editor.chain().focus().undo().run()}>Undo</button>
        <button type="button" className={btn(false)} onClick={() => editor.chain().focus().redo().run()}>Redo</button>
      </span>
    </div>
  );
}
