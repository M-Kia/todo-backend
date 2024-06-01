import { Request } from 'express';

export type RequestWithAuth = Request & { owner_id: string };
