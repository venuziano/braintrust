import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { LoginRequest, LoginResponse } from '../dto/login.dto';
import { AUTH_REPOSITORY_TOKEN, AuthRepository } from '../../domain/repositories/auth.repository.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    // Find user by email
    const user = await this.authRepo.findUserByEmail(request.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Hash the provided password with MD5
    const hashedPassword = crypto.createHash('md5').update(request.password).digest('hex');

    // Compare with stored password hash
    if (hashedPassword !== user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user roles
    const roles = await this.authRepo.findUserRoles(user.id);
    if (!roles || roles.length === 0) {
      throw new UnauthorizedException('User has no assigned roles');
    }

    // Use the first role (assuming single role per user for now)
    const userRole = roles[0];

    // Create JWT payload
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: userRole.name,
    };

    // Generate JWT token
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: userRole.name,
      },
    };
  }
} 