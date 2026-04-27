"use server";

import { redirect } from "next/navigation";

import { PamSemanaType } from "@/db/schema";
import { auth } from "../../../app/auth.config";
import { semanasService } from "../services/SemanasService";

export async function getSemanasAction() {
  const usuario = await auth();

  if (!usuario?.user) {
    redirect("/login");
  }

  const semanas = await semanasService.getSemanas();

  return semanas;
}

export async function getSemanasByDescripcionAction(
  descripcion: string,
): Promise<PamSemanaType | undefined> {
  const usuario = await auth();

  if (!usuario?.user) {
    redirect("/login");
  }

  const semana = await semanasService.getSemanasByDescripcion(descripcion);

  return semana;
}
