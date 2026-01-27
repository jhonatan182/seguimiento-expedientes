CREATE TABLE `PAM_CABECERA_SEMANAL` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`semana_id` integer NOT NULL,
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
	FOREIGN KEY (`semana_id`) REFERENCES `PAM_SEMANAS`(`id`) ON UPDATE cascade ON DELETE restrict
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_PAM_EXPEDIENTES` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`analista_id` integer NOT NULL,
	`semana_id` integer NOT NULL,
	`fecha_ingreso` text NOT NULL,
	`estado` text NOT NULL,
	`fecha_ultima_modificacion` text NOT NULL,
	`observaciones` text,
	FOREIGN KEY (`analista_id`) REFERENCES `PAM_ANALISTA`(`id`) ON UPDATE cascade ON DELETE restrict,
	FOREIGN KEY (`semana_id`) REFERENCES `PAM_SEMANAS`(`id`) ON UPDATE cascade ON DELETE restrict
);
--> statement-breakpoint
INSERT INTO `__new_PAM_EXPEDIENTES`("id", "analista_id", "semana_id", "fecha_ingreso", "estado", "fecha_ultima_modificacion", "observaciones") SELECT "id", "analista_id", "semana_id", "fecha_ingreso", "estado", "fecha_ultima_modificacion", "observaciones" FROM `PAM_EXPEDIENTES`;--> statement-breakpoint
DROP TABLE `PAM_EXPEDIENTES`;--> statement-breakpoint
ALTER TABLE `__new_PAM_EXPEDIENTES` RENAME TO `PAM_EXPEDIENTES`;--> statement-breakpoint
PRAGMA foreign_keys=ON;