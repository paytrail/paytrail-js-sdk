import { Commission } from './commission.model';
export declare class Item {
    unitPrice: number;
    units: number;
    vatPercentage: number;
    productCode: string;
    description?: string;
    category?: string;
    orderId?: string;
    stamp?: string;
    reference?: string;
    merchant?: string;
    commission?: Commission;
}
