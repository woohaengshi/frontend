export interface ErrorResponse {
    error: {
        status: number;
        message: string;
        errors: Record<string, string>;
    };
}
