import {NextPage} from "next";

export type TypeRoles = {
	role?: "owner" | "admin" | "director" | "user"
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

export type TypeComponentAuthFields = { Component: TypeRoles }