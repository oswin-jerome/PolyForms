// next-auth.d.ts
import "next-auth";

// Extend the default session object to include customData
declare module "next-auth" {
  interface Session {
    auth_token: string;
  }

  interface User {
    id: string;
  }
  interface Account {
    auth_token: string;
  }
}

// Extend the default JWT token object to include customData
declare module "next-auth/jwt" {
  interface JWT {
    auth_token: string;
  }
}
