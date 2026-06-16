import { HTMLAttributes, ReactNode } from 'react';
export interface FileTreeNode {
    id: string;
    label: ReactNode;
    children?: FileTreeNode[];
    icon?: ReactNode;
    description?: ReactNode;
    href?: string;
    target?: string;
    rel?: string;
    disabled?: boolean;
    defaultOpen?: boolean;
    onClick?: (node: FileTreeNode) => void;
}
export interface FileTreeRenderContext {
    depth: number;
    hasChildren: boolean;
    isOpen: boolean;
    isSelected: boolean;
    isLeaf: boolean;
}
export interface FileTreeProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    nodes: FileTreeNode[];
    title?: ReactNode;
    description?: ReactNode;
    ariaLabel?: string;
    defaultOpenIds?: string[];
    openIds?: string[];
    onOpenChange?: (openIds: string[]) => void;
    defaultSelectedId?: string | null;
    selectedId?: string | null;
    onSelectedChange?: (selectedId: string | null, node: FileTreeNode | null) => void;
    onNodeClick?: (node: FileTreeNode) => void;
    showLines?: boolean;
    density?: "comfortable" | "compact";
    indent?: number;
    renderLabel?: (node: FileTreeNode, context: FileTreeRenderContext) => ReactNode;
    renderIcon?: (node: FileTreeNode, context: FileTreeRenderContext) => ReactNode;
}
export declare function FileTree({ nodes, title, description, ariaLabel, defaultOpenIds, openIds, onOpenChange, defaultSelectedId, selectedId, onSelectedChange, onNodeClick, showLines, density, indent, renderLabel, renderIcon, className, ...props }: FileTreeProps): import("react").JSX.Element;
