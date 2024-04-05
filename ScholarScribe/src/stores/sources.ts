import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const sourceList: Writable<Record<string, boolean>> = localStorageStore('sourceId', {});

export const exportType: Writable<String> = localStorageStore('exportType', "Bibliography");

export const bibStyle: Writable<String> = localStorageStore('bibStyle', "apa");