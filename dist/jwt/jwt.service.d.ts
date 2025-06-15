import { ConfigService } from '@nestjs/config';
import { Payload } from 'src/interfaces/payload';
export declare class JwtService {
    private configService;
    constructor(configService: ConfigService);
    private get config();
    generateToken(payload: {
        email: string;
    }, type?: 'refresh' | 'auth'): string;
    refreshToken(refreshToken: string): {
        accessToken: string;
        refreshToken: string;
    };
    getPayload(token: string, type?: 'refresh' | 'auth'): Payload;
}
