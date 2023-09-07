import { Response } from './response-model';
/**
 * Class SettlementsResponse
 */
export declare class SettlementsResponse extends Response {
    /**
     * Data response.
     */
    data: SettlementsData;
}
/**
 * Class SettlementsData
 */
export declare class SettlementsData {
    /**
     * The settlements.
     */
    settlements: string;
}
