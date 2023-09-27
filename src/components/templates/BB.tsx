import React, { useCallback, useEffect, useRef, useState, forwardRef, CSSProperties } from 'react';
import { createPortal, unstable_batchedUpdates } from 'react-dom';
import {
    CancelDrop,
    closestCenter,
    pointerWithin,
    rectIntersection,
    CollisionDetection,
    DndContext,
    DragOverlay,
    DropAnimation,
    getFirstCollision,
    MouseSensor,
    TouchSensor,
    Modifiers,
    useDroppable,
    UniqueIdentifier,
    useSensors,
    useSensor,
    MeasuringStrategy,
    KeyboardCoordinateGetter,
    defaultDropAnimationSideEffects,
    DraggableSyntheticListeners,
} from '@dnd-kit/core';
import {
    AnimateLayoutChanges,
    SortableContext,
    useSortable,
    arrayMove,
    defaultAnimateLayoutChanges,
    verticalListSortingStrategy,
    SortingStrategy,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS, Transform } from '@dnd-kit/utilities';
import theme from '@/assets/styles/theme';
import ScrapCard from '@/components/molcules/Board/ScrapCard';
import { contentProps } from '@/types/ContentType';
import scrapCardDataMock from '__mocks__/scrapCardDataMock';
import { Box } from '@mui/material';

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
    active?: {
        fill: string;
        background: string;
    };
    cursor?: CSSProperties['cursor'];
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
    ({ active, cursor, style, ...props }, ref) => {
        return (
            <button
                ref={ref}
                {...props}
                tabIndex={0}
                style={
                    {
                        ...style,
                        cursor,
                        '--fill': active?.fill,
                        '--background': active?.background,
                    } as CSSProperties
                }
            />
        );
    }
);

export const Handle = forwardRef<HTMLButtonElement, ActionProps>(
    (props, ref) => {
        return (
            <Action
                ref={ref}
                cursor="grab"
                data-cypress="draggable-handle"
                {...props}
            >
                <svg viewBox="0 0 20 20" width="12">
                    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                </svg>
            </Action>
        );
    }
);

export function Remove(props: ActionProps) {
    return (
        <Action
            {...props}
            active={{
                fill: 'rgba(255, 70, 70, 0.95)',
                background: 'rgba(255, 70, 70, 0.1)',
            }}
        >
            <svg width="8" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.99998 -0.000206962C2.7441 -0.000206962 2.48794 0.0972617 2.29294 0.292762L0.292945 2.29276C-0.0980552 2.68376 -0.0980552 3.31682 0.292945 3.70682L7.58591 10.9998L0.292945 18.2928C-0.0980552 18.6838 -0.0980552 19.3168 0.292945 19.7068L2.29294 21.7068C2.68394 22.0978 3.31701 22.0978 3.70701 21.7068L11 14.4139L18.2929 21.7068C18.6829 22.0978 19.317 22.0978 19.707 21.7068L21.707 19.7068C22.098 19.3158 22.098 18.6828 21.707 18.2928L14.414 10.9998L21.707 3.70682C22.098 3.31682 22.098 2.68276 21.707 2.29276L19.707 0.292762C19.316 -0.0982383 18.6829 -0.0982383 18.2929 0.292762L11 7.58573L3.70701 0.292762C3.51151 0.0972617 3.25585 -0.000206962 2.99998 -0.000206962Z" />
            </svg>
        </Action>
    );
}

export interface ContainerProps {
    children: React.ReactNode;
    columns?: number;
    label?: string;
    style?: React.CSSProperties;
    horizontal?: boolean;
    hover?: boolean;
    handleProps?: React.HTMLAttributes<any>;
    scrollable?: boolean;
    shadow?: boolean;
    placeholder?: boolean;
    unstyled?: boolean;
    onClick?(): void;
    onRemove?(): void;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
    (
        {
            children,
            columns = 1,
            handleProps,
            horizontal,
            hover,
            onClick,
            onRemove,
            label,
            placeholder,
            style,
            scrollable,
            shadow,
            unstyled,
            ...props
        }: ContainerProps,
        ref
    ) => {
        const Component = onClick ? 'button' : Box;

        return (
            <Component
                {...props}
                ref={ref as React.RefObject<HTMLButtonElement>}
                style={
                    {
                        ...style,
                        '--columns': columns,
                        width: '320px',
                        backgroundColor: theme.color.Blue_080,
                    } as React.CSSProperties
                }
                onClick={onClick}
                tabIndex={onClick ? 0 : undefined}
            >
                {label ? (
                    <div>
                        {label}
                        <div>
                            {onRemove ? <Remove onClick={onRemove} /> : undefined}
                            <Handle {...handleProps} />
                        </div>
                    </div>
                ) : null}
                {placeholder ? children : <ul>{children}</ul>}
            </Component>
        );
    }
);

function DroppableContainer({
    children,
    columns = 1,
    disabled,
    id,
    items,
    style,
    ...props
}: ContainerProps & {
    disabled?: boolean;
    id: UniqueIdentifier;
    items: UniqueIdentifier[];
    style?: React.CSSProperties;
}) {
    const {
        active,
        attributes,
        isDragging,
        listeners,
        over,
        setNodeRef,
        transition,
        transform,
    } = useSortable({
        id,
        data: {
            type: 'container',
            children: items,
        },
        animateLayoutChanges,
    });
    const isOverContainer = over
        ? (id === over.id && active?.data.current?.type !== 'container') ||
        items.includes(over.id)
        : false;

    return (
        <Container
            ref={disabled ? undefined : setNodeRef}
            style={{
                ...style,
                transition,
                transform: CSS.Translate.toString(transform),
                opacity: isDragging ? 0.5 : undefined,
            }}
            hover={isOverContainer}
            handleProps={{
                ...attributes,
                ...listeners,
            }}
            columns={columns}
            {...props}
        >
            {children}
        </Container>
    );
}

const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};

type Items = Record<UniqueIdentifier, (contentProps['content'] & { id: UniqueIdentifier })[]>;

export interface ItemProps {
    dragOverlay?: boolean;
    color?: string;
    disabled?: boolean;
    dragging?: boolean;
    handle?: boolean;
    handleProps?: any;
    height?: number;
    index?: number;
    fadeIn?: boolean;
    transform?: Transform | null;
    listeners?: DraggableSyntheticListeners;
    sorting?: boolean;
    style?: React.CSSProperties;
    transition?: string | null;
    wrapperStyle?: React.CSSProperties;
    value: UniqueIdentifier;
    content: contentProps['content'];
    onRemove?(): void;
    renderItem?(args: {
        dragOverlay: boolean;
        dragging: boolean;
        sorting: boolean;
        index: number | undefined;
        fadeIn: boolean;
        listeners: DraggableSyntheticListeners;
        ref: React.Ref<HTMLElement>;
        style: React.CSSProperties | undefined;
        transform: ItemProps['transform'];
        transition: ItemProps['transition'];
        value: ItemProps['value'];
        content: ItemProps['content'];
    }): React.ReactElement;
}

export const Item = React.memo(
    React.forwardRef<HTMLLIElement, ItemProps>(
        (
            {
                dragOverlay,
                dragging,
                disabled,
                fadeIn,
                handle,
                handleProps,
                height,
                index,
                listeners,
                onRemove,
                renderItem,
                sorting,
                style,
                transition,
                transform,
                value,
                content,
                wrapperStyle,
                ...props
            },
            ref
        ) => {
            useEffect(() => {
                if (!dragOverlay) {
                    return;
                }

                document.body.style.cursor = 'grabbing';

                return () => {
                    document.body.style.cursor = '';
                };
            }, [dragOverlay]);

            return renderItem ? (
                renderItem({
                    dragOverlay: Boolean(dragOverlay),
                    dragging: Boolean(dragging),
                    sorting: Boolean(sorting),
                    index,
                    fadeIn: Boolean(fadeIn),
                    listeners,
                    ref,
                    style,
                    transform,
                    transition,
                    value,
                    content,
                })
            ) : (
                <Box
                    ref={ref}
                >
                    <div
                        style={style}
                        data-cypress="draggable-item"
                        {...(!handle ? listeners : undefined)}
                        {...props}
                        tabIndex={!handle ? 0 : undefined}
                    >
                        <ScrapCard content={content} />
                    </div>
                </Box>
            );
        }
    )
);

interface Props {
    adjustScale?: boolean;
    cancelDrop?: CancelDrop;
    columns?: number;
    containerStyle?: React.CSSProperties;
    coordinateGetter?: KeyboardCoordinateGetter;
    getItemStyles?(args: {
        value: UniqueIdentifier;
        index: number;
        overIndex: number;
        isDragging: boolean;
        containerId: UniqueIdentifier;
        isSorting: boolean;
        isDragOverlay: boolean;
    }): React.CSSProperties;
    wrapperStyle?(args: { index: number }): React.CSSProperties;
    itemCount?: number;
    items?: Items;
    handle?: boolean;
    renderItem?: any;
    strategy?: SortingStrategy;
    modifiers?: Modifiers;
    minimal?: boolean;
    trashable?: boolean;
    scrollable?: boolean;
    vertical?: boolean;
}

export const TRASH_ID = 'void';
const PLACEHOLDER_ID = 'placeholder';
const empty: UniqueIdentifier[] = [];

export function MultipleContainers({
    adjustScale = false,
    itemCount = 3,
    cancelDrop,
    columns,
    handle = false,
    items: initialItems,
    containerStyle,
    getItemStyles = () => ({}),
    wrapperStyle = () => ({}),
    minimal = false,
    modifiers,
    renderItem,
    strategy = verticalListSortingStrategy,
    trashable = false,
    vertical = false,
    scrollable,
}: Props) {
    const [items, setItems] = useState<Items>(
        () =>
            initialItems ?? {
                A: [{ ...scrapCardDataMock, id: 'A' + scrapCardDataMock.scrapId }],
            }
    );
    const [containers, setContainers] = useState(
        Object.keys(items) as UniqueIdentifier[]
    );
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const lastOverId = useRef<UniqueIdentifier | null>(null);
    const recentlyMovedToNewContainer = useRef(false);
    const isSortingContainer = activeId ? containers.includes(activeId) : false;

    /**
     * Custom collision detection strategy optimized for multiple containers
     *
     * - First, find any droppable containers intersecting with the pointer.
     * - If there are none, find intersecting containers with the active draggable.
     * - If there are no intersecting containers, return the last matched intersection
     *
     */
    const collisionDetectionStrategy: CollisionDetection = useCallback(
        (args) => {
            if (activeId && activeId in items) {
                return closestCenter({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(
                        (container) => container.id in items
                    ),
                });
            }

            // Start by finding any intersecting droppable
            const pointerIntersections = pointerWithin(args);
            const intersections =
                pointerIntersections.length > 0
                    ? // If there are droppables intersecting with the pointer, return those
                    pointerIntersections
                    : rectIntersection(args);
            let overId = getFirstCollision(intersections, 'id');

            if (overId != null) {
                if (overId === TRASH_ID) {
                    // If the intersecting droppable is the trash, return early
                    // Remove this if you're not using trashable functionality in your app
                    return intersections;
                }

                if (overId in items) {
                    const containerItems = items[overId];

                    // If a container is matched and it contains items (columns 'A', 'B', 'C')
                    if (containerItems.length > 0) {
                        // Return the closest droppable within that container
                        overId = closestCenter({
                            ...args,
                            droppableContainers: args.droppableContainers.filter(
                                (container) =>
                                    container.id !== overId &&
                                    containerItems.includes(container.data.current?.id)
                            ),
                        })[0]?.id;
                    }
                }

                lastOverId.current = overId;

                return [{ id: overId }];
            }

            // When a draggable item moves to a new container, the layout may shift
            // and the `overId` may become `null`. We manually set the cached `lastOverId`
            // to the id of the draggable item that was moved to the new container, otherwise
            // the previous `overId` will be returned which can cause items to incorrectly shift positions
            if (recentlyMovedToNewContainer.current) {
                lastOverId.current = activeId;
            }

            // If no droppable is matched, return the last match
            return lastOverId.current ? [{ id: lastOverId.current }] : [];
        },
        [activeId, items]
    );
    const [clonedItems, setClonedItems] = useState<Items | null>(null);
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
    );
    const findContainer = (id: UniqueIdentifier) => {
        if (id in items) {
            return id;
        }

        return Object.keys(items).find((key) => {
            return items[key]['id'] === id;
        });
    };

    const getIndex = (id: UniqueIdentifier) => {
        const container = findContainer(id);

        if (!container) {
            return -1;
        }

        const index = items[container].findIndex((item) => item.id === id);

        return index;
    };

    const onDragCancel = () => {
        if (clonedItems) {
            // Reset items to their original state in case items have been
            // Dragged across containers
            setItems(clonedItems);
        }

        setActiveId(null);
        setClonedItems(null);
    };

    useEffect(() => {
        requestAnimationFrame(() => {
            recentlyMovedToNewContainer.current = false;
        });
    }, [items]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            measuring={{
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }}
            onDragStart={({ active }) => {
                setActiveId(active.id);
                setClonedItems(items);
            }}
            onDragOver={({ active, over }) => {
                const overId = over?.id;

                if (overId == null || overId === TRASH_ID || active.id in items) {
                    return;
                }

                const overContainer = findContainer(overId);
                const activeContainer = findContainer(active.id);

                if (!overContainer || !activeContainer) {
                    return;
                }

                if (activeContainer !== overContainer) {
                    setItems((items) => {
                        const activeItems = items[activeContainer];
                        const overItems = items[overContainer];
                        const overIndex = overItems.indexOf(over?.data.current?.id);
                        const activeIndex = activeItems.indexOf(active.data.current?.id);

                        let newIndex: number;

                        if (overId in items) {
                            newIndex = overItems.length + 1;
                        } else {
                            const isBelowOverItem =
                                over &&
                                active.rect.current.translated &&
                                active.rect.current.translated.top >
                                over.rect.top + over.rect.height;

                            const modifier = isBelowOverItem ? 1 : 0;

                            newIndex =
                                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
                        }

                        recentlyMovedToNewContainer.current = true;

                        return {
                            ...items,
                            [activeContainer]: items[activeContainer].filter(
                                (item) => item.id !== active.id
                            ),
                            [overContainer]: [
                                ...items[overContainer].slice(0, newIndex),
                                items[activeContainer][activeIndex],
                                ...items[overContainer].slice(
                                    newIndex,
                                    items[overContainer].length
                                ),
                            ],
                        };
                    });
                }
            }}
            onDragEnd={({ active, over }) => {
                if (active.id in items && over?.id) {
                    setContainers((containers) => {
                        const activeIndex = containers.indexOf(active.id);
                        const overIndex = containers.indexOf(over.id);

                        return arrayMove(containers, activeIndex, overIndex);
                    });
                }

                const activeContainer = findContainer(active.id);

                if (!activeContainer) {
                    setActiveId(null);
                    return;
                }

                const overId = over?.id;

                if (overId == null) {
                    setActiveId(null);
                    return;
                }

                if (overId === TRASH_ID) {
                    setItems((items) => ({
                        ...items,
                        [activeContainer]: items[activeContainer].filter(
                            (id) => id.id !== activeId
                        ),
                    }));
                    setActiveId(null);
                    return;
                }

                if (overId === PLACEHOLDER_ID) {
                    const newContainerId = getNextContainerId();

                    unstable_batchedUpdates(() => {
                        setContainers((containers) => [...containers, newContainerId]);
                        setItems((items) => {
                            const newItems = { ...items };
                            newItems[activeContainer] = items[activeContainer].filter(
                                (id) => id.id !== activeId
                            );
                            newItems[newContainerId] = [active.data.current?.id];
                            return newItems;
                        });
                        setActiveId(null);
                    });
                    return;
                }

                const overContainer = findContainer(overId);

                if (overContainer) {
                    const activeIndex = items[activeContainer].indexOf(active.data.current?.id);
                    const overIndex = items[overContainer].indexOf(over?.data.current?.id);

                    if (activeIndex !== overIndex) {
                        setItems((items) => ({
                            ...items,
                            [overContainer]: arrayMove(
                                items[overContainer],
                                activeIndex,
                                overIndex
                            ),
                        }));
                    }
                }

                setActiveId(null);
            }}
            cancelDrop={cancelDrop}
            onDragCancel={onDragCancel}
            modifiers={modifiers}
        >
            <div
                style={{
                    display: 'inline-grid',
                    boxSizing: 'border-box',
                    padding: 20,
                    gridAutoFlow: vertical ? 'row' : 'column',
                }}
            >
                <SortableContext
                    items={[...containers, PLACEHOLDER_ID]}
                    strategy={
                        vertical
                            ? verticalListSortingStrategy
                            : horizontalListSortingStrategy
                    }
                >
                    {containers.map((containerId) => (
                        <DroppableContainer
                            key={containerId}
                            id={containerId}
                            label={minimal ? undefined : `Column ${containerId}`}
                            columns={columns}
                            items={items[containerId].map((item) => item.id)}
                            scrollable={scrollable}
                            style={containerStyle}
                            unstyled={minimal}
                            onRemove={() => handleRemove(containerId)}
                        >
                            <SortableContext items={items[containerId]} strategy={strategy}>
                                {items[containerId].map((value, index) => {
                                    return (
                                        <SortableItem
                                            disabled={isSortingContainer}
                                            key={value.id}
                                            id={value.id}
                                            content={value}
                                            index={index}
                                            handle={handle}
                                            style={getItemStyles}
                                            wrapperStyle={wrapperStyle}
                                            renderItem={renderItem}
                                            containerId={containerId}
                                            getIndex={getIndex}
                                        />
                                    );
                                })}
                            </SortableContext>
                        </DroppableContainer>
                    ))}
                    {minimal ? undefined : (
                        <DroppableContainer
                            id={PLACEHOLDER_ID}
                            disabled={isSortingContainer}
                            items={empty}
                            onClick={handleAddColumn}
                            placeholder
                        >
                            + Add column
                        </DroppableContainer>
                    )}
                </SortableContext>
            </div>
            {createPortal(
                <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
                    {activeId
                        ? containers.includes(activeId)
                            ? renderContainerDragOverlay(activeId)
                            : renderSortableItemDragOverlay(activeId)
                        : null}
                </DragOverlay>,
                document.body
            )}
            {trashable && activeId && !containers.includes(activeId) ? (
                <Trash id={TRASH_ID} />
            ) : null}
        </DndContext>
    );

    function renderSortableItemDragOverlay(id: UniqueIdentifier) {
        return (
            <Item
                value={id}
                handle={handle}
                style={getItemStyles({
                    containerId: findContainer(id) as UniqueIdentifier,
                    overIndex: -1,
                    index: getIndex(id),
                    value: id,
                    isSorting: true,
                    isDragging: true,
                    isDragOverlay: true,
                })}
                content={items[findContainer(id) as UniqueIdentifier].find(item => item.id === id) as contentProps['content']}
                color={getColor(id)}
                wrapperStyle={wrapperStyle({ index: 0 })}
                renderItem={renderItem}
                dragOverlay
            />
        );
    }

    function renderContainerDragOverlay(containerId: UniqueIdentifier) {
        return (
            <Container
                label={`Column ${containerId}`}
                columns={columns}
                style={{
                    height: '100%',
                }}
                shadow
                unstyled={false}
            >
                {items[containerId].map((item, index) => (
                    <Item
                        key={item.id}
                        value={item.id}
                        handle={handle}
                        style={getItemStyles({
                            containerId,
                            overIndex: -1,
                            index: getIndex(item.id),
                            value: item.id,
                            isDragging: false,
                            isSorting: false,
                            isDragOverlay: false,
                        })}
                        content={item}
                        color={getColor(item.id)}
                        wrapperStyle={wrapperStyle({ index })}
                        renderItem={renderItem}
                    />
                ))}
            </Container>
        );
    }

    function handleRemove(containerID: UniqueIdentifier) {
        setContainers((containers) =>
            containers.filter((id) => id !== containerID)
        );
    }

    function handleAddColumn() {
        const newContainerId = getNextContainerId();

        unstable_batchedUpdates(() => {
            setContainers((containers) => [...containers, newContainerId]);
            setItems((items) => ({
                ...items,
                [newContainerId]: [],
            }));
        });
    }

    function getNextContainerId() {
        const containerIds = Object.keys(items);
        const lastContainerId = containerIds[containerIds.length - 1];

        return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
    }
}

function getColor(id: UniqueIdentifier) {
    switch (String(id)[0]) {
        case 'A':
            return '#7193f1';
        case 'B':
            return '#ffda6c';
        case 'C':
            return '#00bcd4';
        case 'D':
            return '#ef769f';
    }

    return undefined;
}

function Trash({ id }: { id: UniqueIdentifier }) {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                left: '50%',
                marginLeft: -150,
                bottom: 20,
                width: 300,
                height: 60,
                borderRadius: 5,
                border: '1px solid',
                borderColor: isOver ? 'red' : '#DDD',
            }}
        >
            Drop here to delete
        </div>
    );
}


interface SortableItemProps {
    containerId: UniqueIdentifier;
    id: UniqueIdentifier;
    content: contentProps['content'];
    index: number;
    handle: boolean;
    disabled?: boolean;
    style(args: any): React.CSSProperties;
    getIndex(id: UniqueIdentifier): number;
    renderItem(): React.ReactElement;
    wrapperStyle({ index }: { index: number }): React.CSSProperties;
}

function SortableItem({
    disabled,
    id,
    index,
    handle,
    renderItem,
    style,
    content,
    containerId,
    getIndex,
    wrapperStyle,
}: SortableItemProps) {
    const {
        setNodeRef,
        setActivatorNodeRef,
        listeners,
        isDragging,
        isSorting,
        over,
        overIndex,
        transform,
        transition,
    } = useSortable({
        id,
    });
    const mounted = useMountStatus();
    const mountedWhileDragging = isDragging && !mounted;

    return (
        <Item
            ref={disabled ? undefined : setNodeRef}
            value={id}
            dragging={isDragging}
            sorting={isSorting}
            handle={handle}
            handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
            index={index}
            wrapperStyle={wrapperStyle({ index })}
            style={style({
                index,
                value: id,
                isDragging,
                isSorting,
                overIndex: over ? getIndex(over.id) : overIndex,
                containerId,
            })}
            content={content}
            color={getColor(id)}
            transition={transition}
            transform={transform}
            fadeIn={mountedWhileDragging}
            listeners={listeners}
            renderItem={renderItem}
        />
    );
}

function useMountStatus() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 500);

        return () => clearTimeout(timeout);
    }, []);

    return isMounted;
}
