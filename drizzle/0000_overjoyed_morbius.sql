CREATE TABLE `PAM_ANALISTA` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre` text NOT NULL,
	`usuario` text NOT NULL,
	`password` text NOT NULL,
	`modulo` text(1)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `PAM_ANALISTA_usuario_unique` ON `PAM_ANALISTA` (`usuario`);--> statement-breakpoint
CREATE TABLE `PAM_EXPEDIENTES` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`analista_id` integer,
	`semana_id` integer,
	`fecha_ingreso` text NOT NULL,
	`estado` text NOT NULL,
	`fecha_ultima_modificacion` text NOT NULL,
	`observaciones` text,
	FOREIGN KEY (`analista_id`) REFERENCES `PAM_ANALISTA`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`semana_id`) REFERENCES `PAM_SEMANAS`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PAM_SEMANAS` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`descripcion` text NOT NULL
);
