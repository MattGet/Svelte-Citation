import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const sourceList: Writable<Record<string, boolean>> = localStorageStore('sourceList', {});

export const importList: Writable<string[]> = localStorageStore('importList', []);

export const exportType: Writable<String> = localStorageStore('exportType', "Bibliography");

export const addCiteType: Writable<String> = localStorageStore('addCiteType', "import");

export const importType: Writable<String> = localStorageStore('importType', "BibTex");

export const bibStyle: Writable<String> = localStorageStore('bibStyle', "apa");