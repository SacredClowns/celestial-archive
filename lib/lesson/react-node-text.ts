import { Children, isValidElement, type ReactNode } from "react";

const MAX_DEPTH = 48;

/** Flatten React markdown output to plain text for lightweight parsers. */
export function reactNodeToPlainText(node: ReactNode, depth = 0): string {
  if (depth > MAX_DEPTH) return "";
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) {
    return node.map((child) => reactNodeToPlainText(child, depth + 1)).join("");
  }
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    if (props.children !== undefined) {
      return reactNodeToPlainText(props.children, depth + 1);
    }
    return "";
  }
  return Children.toArray(node)
    .map((child) => reactNodeToPlainText(child, depth + 1))
    .join("");
}
