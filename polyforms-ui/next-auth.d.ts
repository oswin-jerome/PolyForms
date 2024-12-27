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

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
    }
  }
}
