import { Node, mergeAttributes } from '@tiptap/core';

export const ColumnLayout = Node.create({
    name: 'columnLayout',
    group: 'block',
    content: 'columnBlock+',
    defining: true,

    addAttributes() {
        return {
            cols: { default: 2 },
        };
    },

    parseHTML() {
        return [{ tag: 'div[data-type="column-layout"]' }];
    },

    renderHTML({ HTMLAttributes, node }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'column-layout',
                style: `display:grid;grid-template-columns:repeat(${node.attrs.cols},1fr);gap:1rem;`,
            }),
            0,
        ];
    },
});

export const ColumnBlock = Node.create({
    name: 'columnBlock',
    group: 'columnBlock',
    content: 'block+',
    defining: true,

    parseHTML() {
        return [{ tag: 'div[data-type="column-block"]' }];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'column-block',
                style: 'min-width:0;',
            }),
            0,
        ];
    },
});