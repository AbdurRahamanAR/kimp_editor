import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $insertNodes } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useEffect } from "react";

export default function UpdateFormValuePlugin({
  value,
}: {
  value: string | undefined;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!value) return;
    editor.update(() => {
      if (value?.trim() === $generateHtmlFromNodes(editor)) {
        return;
      }
      const parser = new DOMParser();
      const dom = parser.parseFromString(value, "text/html");

      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(editor, dom);

      // Select the root
      $getRoot().clear();
      $getRoot().select();

      // Insert them at a selection.
      $insertNodes(nodes);
    });
  }, [value, editor]);

  return null;
}
