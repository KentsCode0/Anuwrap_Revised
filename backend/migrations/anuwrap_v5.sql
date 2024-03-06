CREATE TABLE IF NOT EXISTS annualreport (
    annual_report_id int(64) UNSIGNED NOT NULL AUTO_INCREMENT, title varchar(100) NOT NULL, description text DEFAULT NULL, workspace_id int(10) UNSIGNED DEFAULT NULL, date_modified timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), date_created timestamp NOT NULL DEFAULT current_timestamp(), PRIMARY KEY (annual_report_id), KEY title (title), KEY workspace_id (workspace_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS collage (
    collage_id int(64) UNSIGNED NOT NULL AUTO_INCREMENT, name varchar(100) NOT NULL, workspace_id int(10) UNSIGNED DEFAULT NULL, date_modified timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), date_created timestamp NOT NULL DEFAULT current_timestamp(), PRIMARY KEY (collage_id), KEY workspace_id (workspace_id), KEY name (name)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS collageimage (
    collage_image_id int(64) UNSIGNED NOT NULL AUTO_INCREMENT, path text NOT NULL, collage_id int(10) UNSIGNED DEFAULT NULL, PRIMARY KEY (collage_image_id), KEY collage_id (collage_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS report (
    report_id int(64) UNSIGNED NOT NULL AUTO_INCREMENT, title varchar(100) NOT NULL, description text DEFAULT NULL, workspace_id int(10) UNSIGNED DEFAULT NULL, date_modified timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), date_created timestamp NOT NULL DEFAULT current_timestamp(), PRIMARY KEY (report_id), KEY workspace_id (workspace_id), KEY title (title)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS reportselection (
    annual_report_id int(64) UNSIGNED NOT NULL, report_id int(10) UNSIGNED NOT NULL, PRIMARY KEY (annual_report_id, report_id), KEY report_id (report_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS role (
    role_id int(64) UNSIGNED NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, PRIMARY KEY (role_id), KEY name (name)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS user (
    user_id int(64) UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, first_name varchar(50) NOT NULL, last_name varchar(50) NOT NULL, email tinytext NOT NULL, password varchar(60) NOT NULL, PRIMARY KEY (user_id), UNIQUE KEY username_unique (username), UNIQUE KEY email_unique (email (100)) USING HASH, KEY username (username), KEY email (email (255))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS userworkspace (
    user_id int(64) UNSIGNED NOT NULL, workspace_id int(10) UNSIGNED NOT NULL, role_id int(10) UNSIGNED DEFAULT NULL, PRIMARY KEY (user_id, workspace_id), KEY workspace_id (workspace_id), KEY role_id (role_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS workspace (
    workspace_id int(64) UNSIGNED NOT NULL AUTO_INCREMENT, name varchar(100) NOT NULL, date_modified timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), date_created timestamp NOT NULL DEFAULT current_timestamp(), PRIMARY KEY (workspace_id), KEY name (name)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

INSERT IGNORE INTO role (role_id, name) VALUES (1, 'superadmin'), (2, 'admin'), (3, 'user');
