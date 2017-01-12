SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'todo_db';
CREATE DATABASE todo_db;

ALTER TABLE task MODIFY COLUMN user_id int(10) unsigned;
ALTER TABLE task ADD FOREIGN KEY (user_id) REFERENCES user(id);
CREATE TRIGGER update_user_profile AFTER UPDATE ON `task` FOR EACH ROW BEGIN UPDATE user SET completed_tasks=completed_tasks+1, productivity_points=productivity_points+OLD.priority WHERE NEW.category='Completed' AND user.id=OLD.user_id; END;
INSERT INTO user (name, email, password, admin, daily_tasks, max_priority_first, completed_tasks, productivity_points) VALUES('root', 'root@to.do', '" + {{hash}} + "', 1, 5, 1, 0, 0);
