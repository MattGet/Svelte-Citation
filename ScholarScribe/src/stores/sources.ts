import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const sourceList: Writable<Record<string, boolean>> = localStorageStore('sourceId', {});