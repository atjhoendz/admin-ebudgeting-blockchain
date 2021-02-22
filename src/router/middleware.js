import { AuthService } from '@/services/auth.service';

export async function checkAccessMiddleware(to, from, next) {
  const isAccessTokenExpired = AuthService.isAccessTokenExpired();
  const isAuthRoute = to.matched.some(item => item.meta.isAuth);

  if (isAuthRoute && !isAccessTokenExpired) return next();
  if (isAuthRoute && AuthService.hasRefreshToken()) {
    try {
      await AuthService.debounceRefreshToken();
      next();
    } catch (err) {
      console.log(err);
    }
  }
  if (isAuthRoute) return next({ name: 'Login' });
  next();
}
