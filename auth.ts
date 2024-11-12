import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { NextResponse } from "next/server";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.includes("/dashboard");
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false;
			} else if (!isLoggedIn && isOnDashboard) {
				return NextResponse.redirect(new URL("/api/auth/signin", nextUrl));
			}
			return true;
		},
	},
});
