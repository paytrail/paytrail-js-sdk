import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested
} from 'class-validator'
import { RequestType } from './request-model/request-type.model'
import { PaymentStatus } from './request-model/payment-status.model'
import { ReportFields } from './request-model/report-field.model'

/**
 * Class PaymentReportRequest
 *
 * @see https://docs.paytrail.com/#/?id=payment-report-request
 */
export class PaymentReportRequest {
  /**
   * In which format will the response be delivered in, currently supported are json and csv.
   */
  @IsEnum(RequestType)
  @IsNotEmpty()
  requestType: RequestType

  /**
   * The url the system will send the report to as a POST request.
   */
  @IsNotEmpty()
  @IsString()
  callbackUrl: string

  /**
   * How are the payments statuses filtered. default includes both paid and settled payments,
   * paid includes paid payments that have not been settled yet, all includes everything,
   * for example unpaid or failed payments and settled only includes settled payments.
   */
  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus?: PaymentStatus

  /**
   * Only trades created after this datetime will be included in the report. Expects date as ISO format.
   */
  @IsString()
  @IsNotEmpty()
  startDate: string

  /**
   * Only trades created before this datetime will be included in the report. Expects date as ISO format.
   */
  @IsString()
  @IsNotEmpty()
  endDate: string

  /**
   * Limit the amount of payments included in the report.
   */
  @IsInt()
  @Min(0)
  @Max(50000)
  @IsOptional()
  limit?: number

  /**
   * Limit the fields that will be included in the report. Leaving this empty will include all fields.
   */
  @IsArray()
  @ValidateNested()
  @IsOptional()
  reportFields?: ReportFields[]

  /**
   * Get submerchant's payment report (aggregate only).
   */
  @IsInt()
  @IsOptional()
  submerchant?: number

  /**
   * Include trade items in generated report. Only applicable when requestType is set to json.
   */
  @IsBoolean()
  @IsOptional()
  includeItems?: boolean
}
