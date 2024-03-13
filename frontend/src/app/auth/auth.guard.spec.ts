import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for canActivate when authenticated', () => {
    // Mock your authentication service to return true
    const authServiceStub = { isAuthenticated: () => true };
    spyOn(authServiceStub, 'isAuthenticated').and.returnValue(true);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    expect(guard.canActivate(route, state)).toBe(true);
  });

  it('should return false for canActivate when not authenticated', () => {
    // Mock your authentication service to return false
    const authServiceStub = { isAuthenticated: () => false };
    spyOn(authServiceStub, 'isAuthenticated').and.returnValue(false);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    expect(guard.canActivate(route, state)).toBe(false);
  });
});
