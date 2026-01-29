import { AsyncLocalStorage } from 'async_hooks';

interface TenantStore {
    tenantKey: string;
}

export const TenantContext = new AsyncLocalStorage<TenantStore>();