export declare class Signature {
    private static supportedEnc;
    static calculateHmac: (secret: string, hparams: {
        [key: string]: string;
    }, body: object | "" | {
        [key: string]: string | number | object;
    }, encType?: string) => string;
    static validateHmac(hparams: {
        [key: string]: string;
    }, body: {
        [key: string]: string | number | object;
    } | '', signature?: string, secretKey?: string, encType?: string): boolean;
    static encodeMD5(data: string): string;
}
