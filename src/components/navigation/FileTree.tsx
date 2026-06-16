import {
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode
} from "react";

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

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getNodeText(label: ReactNode, fallback: string) {
  return typeof label === "string" ? label : fallback;
}

function uniqueIds(...groups: Array<string[] | undefined>) {
  const merged = new Set<string>();

  groups.forEach((group) => {
    group?.forEach((id) => merged.add(id));
  });

  return Array.from(merged);
}

function collectDefaultOpenIds(nodes: FileTreeNode[], result = new Set<string>()) {
  nodes.forEach((node) => {
    if (node.defaultOpen && node.children?.length) {
      result.add(node.id);
    }

    if (node.children?.length) {
      collectDefaultOpenIds(node.children, result);
    }
  });

  return result;
}

function findNodeById(nodes: FileTreeNode[], nodeId: string): FileTreeNode | null {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return node;
    }

    if (node.children?.length) {
      const match = findNodeById(node.children, nodeId);

      if (match) {
        return match;
      }
    }
  }

  return null;
}

function FolderIcon({ isOpen }: { isOpen: boolean }) {
  return isOpen ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M3 10h18" opacity=".55" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M3 9.5h18" opacity=".55" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3.5h6l4 4V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M13 3.5V8h4.5" />
      <path d="M8 12.5h8M8 16h8" opacity=".55" />
    </svg>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={cx("rpc-file-tree__chevron-icon", isOpen && "rpc-file-tree__chevron-icon--open")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m8 10 4 4 4-4" />
    </svg>
  );
}

interface BranchProps {
  nodes: FileTreeNode[];
  depth: number;
  selectedId: string | null;
  openSet: Set<string>;
  showLines: boolean;
  density: "comfortable" | "compact";
  indent: number;
  onToggle: (node: FileTreeNode) => void;
  onSelect: (node: FileTreeNode) => void;
  onNodeClick?: (node: FileTreeNode) => void;
  renderLabel?: (node: FileTreeNode, context: FileTreeRenderContext) => ReactNode;
  renderIcon?: (node: FileTreeNode, context: FileTreeRenderContext) => ReactNode;
}

function FileTreeBranch({
  nodes,
  depth,
  selectedId,
  openSet,
  showLines,
  density,
  indent,
  onToggle,
  onSelect,
  onNodeClick,
  renderLabel,
  renderIcon
}: BranchProps) {
  return (
    <ul className={cx("rpc-file-tree__list", showLines && "rpc-file-tree__list--lines")} role={depth === 0 ? "group" : "group"}>
      {nodes.map((node) => {
        const hasChildren = Boolean(node.children?.length);
        const isOpen = hasChildren && openSet.has(node.id);
        const isSelected = selectedId === node.id;
        const isLeaf = !hasChildren;
        const context: FileTreeRenderContext = {
          depth,
          hasChildren,
          isOpen,
          isSelected,
          isLeaf
        };
        const labelNode = renderLabel ? renderLabel(node, context) : node.label;
        const iconNode = renderIcon ? renderIcon(node, context) : node.icon ?? (hasChildren ? <FolderIcon isOpen={isOpen} /> : <FileIcon />);
        const rowClass = cx(
          "rpc-file-tree__row",
          `rpc-file-tree__row--${density}`,
          hasChildren && "rpc-file-tree__row--branch",
          isSelected && "rpc-file-tree__row--selected",
          node.disabled && "rpc-file-tree__row--disabled"
        );
        const content = (
          <>
            <span className="rpc-file-tree__icon" aria-hidden="true">
              {iconNode}
            </span>
            <span className="rpc-file-tree__text">
              <span className="rpc-file-tree__label">{labelNode}</span>
              {node.description ? <span className="rpc-file-tree__description">{node.description}</span> : null}
            </span>
          </>
        );

        const commonProps = {
          "aria-disabled": node.disabled || undefined,
          "aria-expanded": hasChildren ? isOpen || undefined : undefined,
          "aria-level": depth + 1,
          "aria-selected": isSelected || undefined,
          className: rowClass,
          role: "treeitem",
          onClick: () => {
            if (node.disabled) {
              return;
            }

            onSelect(node);
            onNodeClick?.(node);
            node.onClick?.(node);
          }
        } as const;

        const row = node.href ? (
          <a
            {...(commonProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
            href={node.disabled ? undefined : node.href}
            rel={node.rel}
            target={node.target}
          >
            {content}
          </a>
        ) : (
          <button {...commonProps} disabled={node.disabled} type="button">
            {content}
          </button>
        );

        return (
          <li className="rpc-file-tree__item" key={node.id} role="none">
            <div className="rpc-file-tree__row-wrap" style={{ paddingLeft: depth * indent }}>
              {hasChildren ? (
                <button
                  aria-expanded={isOpen}
                  aria-label={isOpen ? `Collapse ${getNodeText(node.label, node.id)}` : `Expand ${getNodeText(node.label, node.id)}`}
                  className="rpc-file-tree__toggle"
                  disabled={node.disabled}
                  onClick={() => onToggle(node)}
                  type="button"
                >
                  <ChevronIcon isOpen={isOpen} />
                </button>
              ) : (
                <span className="rpc-file-tree__toggle rpc-file-tree__toggle--spacer" aria-hidden="true" />
              )}

              {row}
            </div>

            {hasChildren && isOpen ? (
              <div className="rpc-file-tree__children">
                <FileTreeBranch
                  density={density}
                  indent={indent}
                  nodes={node.children ?? []}
                  onNodeClick={onNodeClick}
                  onSelect={onSelect}
                  onToggle={onToggle}
                  openSet={openSet}
                  renderIcon={renderIcon}
                  renderLabel={renderLabel}
                  selectedId={selectedId}
                  showLines={showLines}
                  depth={depth + 1}
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function FileTree({
  nodes,
  title,
  description,
  ariaLabel,
  defaultOpenIds,
  openIds,
  onOpenChange,
  defaultSelectedId = null,
  selectedId,
  onSelectedChange,
  onNodeClick,
  showLines = true,
  density = "comfortable",
  indent = 20,
  renderLabel,
  renderIcon,
  className = "",
  ...props
}: FileTreeProps) {
  const initialOpenIds = useMemo(
    () => uniqueIds(defaultOpenIds, Array.from(collectDefaultOpenIds(nodes))),
    [defaultOpenIds, nodes]
  );
  const [internalOpenIds, setInternalOpenIds] = useState<string[]>(initialOpenIds);
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(defaultSelectedId);

  const resolvedOpenIds = openIds ?? internalOpenIds;
  const resolvedSelectedId = selectedId ?? internalSelectedId;
  const openSet = useMemo(() => new Set(resolvedOpenIds), [resolvedOpenIds]);
  const hasHeader = Boolean(title || description);

  const updateOpenIds = (nextOpenIds: string[]) => {
    if (openIds === undefined) {
      setInternalOpenIds(nextOpenIds);
    }

    onOpenChange?.(nextOpenIds);
  };

  const updateSelectedId = (nextSelectedId: string | null) => {
    if (selectedId === undefined) {
      setInternalSelectedId(nextSelectedId);
    }

    onSelectedChange?.(nextSelectedId, nextSelectedId ? findNodeById(nodes, nextSelectedId) : null);
  };

  const toggleNode = (node: FileTreeNode) => {
    if (!node.children?.length || node.disabled) {
      return;
    }

    const nextOpenIds = openSet.has(node.id)
      ? resolvedOpenIds.filter((id) => id !== node.id)
      : uniqueIds(resolvedOpenIds, [node.id]);

    updateOpenIds(nextOpenIds);
  };

  const selectNode = (node: FileTreeNode) => {
    if (node.disabled) {
      return;
    }

    updateSelectedId(node.id);
  };

  return (
    <div
      {...props}
      aria-label={ariaLabel ?? (typeof title === "string" ? title : "File tree")}
      className={cx("rpc-file-tree", density === "compact" && "rpc-file-tree--compact", !showLines && "rpc-file-tree--no-lines", className)}
      role="tree"
    >
      {hasHeader ? (
        <div className="rpc-file-tree__header">
          {title ? <h3 className="rpc-file-tree__title">{title}</h3> : null}
          {description ? <p className="rpc-file-tree__description-text">{description}</p> : null}
        </div>
      ) : null}

      <FileTreeBranch
        density={density}
        indent={indent}
        nodes={nodes}
        onNodeClick={onNodeClick}
        onSelect={selectNode}
        onToggle={toggleNode}
        openSet={openSet}
        renderIcon={renderIcon}
        renderLabel={renderLabel}
        selectedId={resolvedSelectedId}
        showLines={showLines}
        depth={0}
      />
    </div>
  );
}
