CREATE TABLE `PAM_ANALISTA` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre` text NOT NULL,
	`usuario` text NOT NULL,
	`password` text NOT NULL,
	`modulo` text(1)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `PAM_ANALISTA_usuario_unique` ON `PAM_ANALISTA` (`usuario`);--> statement-breakpoint
CREATE TABLE `PAM_SEMANAS` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`descripcion` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `PAM_CABECERA_SEMANAL` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`semana_id` integer NOT NULL,
	`analista_id` integer NOT NULL,
	`saldo_anterior` integer NOT NULL,
	`nuevo_ingreso` integer NOT NULL,
	`circulacion` integer NOT NULL,
	`resuelto` integer NOT NULL,
	`con_lugar` integer NOT NULL,
	`sin_lugar` integer NOT NULL,
	`parcial` integer NOT NULL,
	`caducado` integer NOT NULL,
	`dictamen` integer NOT NULL,
	`requerido` integer NOT NULL,
	`pendiente` integer NOT NULL,
	`historico_circulacion` integer NOT NULL,
	FOREIGN KEY (`semana_id`) REFERENCES `PAM_SEMANAS`(`id`) ON UPDATE cascade ON DELETE restrict,
	FOREIGN KEY (`analista_id`) REFERENCES `PAM_ANALISTA`(`id`) ON UPDATE cascade ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `PAM_EXPEDIENTES` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`expediente` text NOT NULL,
	`analista_id` integer NOT NULL,
	`semana_id` integer NOT NULL,
	`fecha_ingreso` text NOT NULL,
	`estado` text NOT NULL,
	`fecha_ultima_modificacion` text NOT NULL,
	`observaciones` text,
	FOREIGN KEY (`analista_id`) REFERENCES `PAM_ANALISTA`(`id`) ON UPDATE cascade ON DELETE restrict,
	FOREIGN KEY (`semana_id`) REFERENCES `PAM_SEMANAS`(`id`) ON UPDATE cascade ON DELETE restrict
);
