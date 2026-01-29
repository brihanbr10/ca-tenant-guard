import { Injectable, NestMiddleware } from '@nestjs/common';
import { TenantContext } from './tenant-context';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const tenantKey = req.headers['ca-tenant-key'];

        if (!tenantKey) {
            throw new Error('Tenant no especificado');
        }

        TenantContext.run({ tenantKey }, () => {
            next();
        });
    }
}