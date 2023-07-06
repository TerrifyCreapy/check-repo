export interface IAuthResponse {
    access_token: string;
    refresh_token: string;
    token_type: string | "Bearer";
    expires_in: number;
    scope: string;
    created_at: number;
}