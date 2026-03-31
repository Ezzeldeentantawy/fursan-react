import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { ColumnLayout, ColumnBlock } from './tiptap extensions/Columns';

const RichTextEditor = ({ value, onChange, lang }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            ColumnLayout,
            ColumnBlock,
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A69C6] outline-none min-h-[150px] prose max-w-none',
                dir: lang === 'ar' ? 'rtl' : 'ltr',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) return null;

    const btnClass = "px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs font-bold mr-1";
    const activeBtn = "bg-blue-600 text-white hover:bg-blue-700";

    const insertColumns = (cols) => {
        const colNodes = Array.from({ length: cols }, () => ({
            type: 'columnBlock',
            content: [{ type: 'paragraph' }],
        }));

        editor.chain().focus().insertContent({
            type: 'columnLayout',
            attrs: { cols },
            content: colNodes,
        }).run();
    };

    return (
        <div className="border rounded-xl overflow-hidden bg-white">
            {/* TOOLBAR */}
            <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`${btnClass} ${editor.isActive('bold') ? activeBtn : ''}`}>B</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${btnClass} ${editor.isActive('heading') ? activeBtn : ''}`}>H2</button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${btnClass} ${editor.isActive('bulletList') ? activeBtn : ''}`}>• List</button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${btnClass} ${editor.isActive('orderedList') ? activeBtn : ''}`}>1. List</button>

                {/* Divider */}
                <span className="w-px bg-gray-300 mx-1 self-stretch" />

                {/* Column buttons */}
                <button type="button" onClick={() => insertColumns(1)} className={btnClass}>▣ 1 Col</button>
                <button type="button" onClick={() => insertColumns(2)} className={btnClass}>⬒ 2 Col</button>

                <span className="w-px bg-gray-300 mx-1 self-stretch" />
                <button
                    type="button"
                    title="Indent"
                    onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                    disabled={!editor.can().sinkListItem('listItem')}
                    className={`${btnClass} disabled:opacity-30`}
                >
                    →
                </button>
                <button
                    type="button"
                    title="Outdent"
                    onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                    disabled={!editor.can().liftListItem('listItem')}
                    className={`${btnClass} disabled:opacity-30`}
                >
                    ←
                </button>
            </div>

            {/* EDITOR AREA */}
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;