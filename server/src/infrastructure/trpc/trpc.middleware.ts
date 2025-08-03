import { TRPCError, initTRPC } from '@trpc/server';
import { JwtService } from '@nestjs/jwt';
import { t, type Context } from './trpc.shared';

export interface AuthContext {
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
    clientId?: number;
  };
}

export interface RoleConfig {
  roles: string[];
  message?: string;
}

// Middleware for JWT authentication
export const createAuthMiddleware = (jwtService: JwtService) => {
  return t.middleware(async ({ ctx, next }) => {
    const authHeader = ctx.req?.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Missing or invalid authorization header',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const payload = jwtService.verify(token);
      const authContext: AuthContext = {
        user: {
          id: payload.sub, name: payload.name,
          email: payload.email,
          role: payload.role,
          clientId: payload.sub || payload.userId
        },
      };

      return next({
        ctx: {
          ...ctx,
          ...authContext,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token',
      });
    }
  });
};

// Middleware for role-based authorization
export const createRoleMiddleware = (config: RoleConfig) => {
  return t.middleware(async ({ ctx, next }) => {
    const user = (ctx as AuthContext).user;

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated',
      });
    }

    if (!config.roles.includes(user.role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: config.message || `Access denied. Required roles: ${config.roles.join(', ')}`,
      });
    }

    return next({
      ctx,
    });
  });
};

// Helper function to create protected procedures
export const createProtectedProcedure = (jwtService: JwtService) => {
  const authMiddleware = createAuthMiddleware(jwtService);
  
  return {
    // Procedure that requires authentication only
    auth: t.procedure.use(authMiddleware),
    
    // Procedure that requires specific roles
    role: (config: RoleConfig) => {
      const roleMiddleware = createRoleMiddleware(config);
      return t.procedure.use(authMiddleware).use(roleMiddleware);
    },
    
    // Common role configurations
    admin: (jwtService: JwtService) => {
      const authMiddleware = createAuthMiddleware(jwtService);
      const roleMiddleware = createRoleMiddleware({ 
        roles: ['Admin'],
        message: 'Admin access required'
      });
      return t.procedure.use(authMiddleware).use(roleMiddleware);
    },
    
    client: (jwtService: JwtService) => {
      const authMiddleware = createAuthMiddleware(jwtService);
      const roleMiddleware = createRoleMiddleware({ 
        roles: ['Client', 'Solutions Engineer'],
        message: 'Client access required'
      });
      return t.procedure.use(authMiddleware).use(roleMiddleware);
    },
  };
}