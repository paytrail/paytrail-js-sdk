/**
 * Class SettlementsRequest
 *
 * @see https://docs.paytrail.com/#/?id=settlements
 */
export declare class SettlementsRequest {
    /**
     * Only include settlements that were settled with this bank reference.
     */
    bankReference?: string;
    /**
     * Limit the number of settlement IDs returned. Limit 1 will only include the most recent settlement.
     */
    limit: number;
    /**
     * Get submerchant's payment report (aggregate only).
     */
    submerchant?: number;
    /**
     * Only settlements created after this date will be included in the response. Must follow the following format: YYYY-MM-DD.
     */
    startDate: string;
    /**
     * Only settlements created before or on this date will be included in the response. Must follow the following format: YYYY-MM-DD.
     */
    endDate: string;
}
