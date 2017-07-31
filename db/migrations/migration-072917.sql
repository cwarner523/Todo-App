\connect todo_list;

CREATE TABLE IF NOT EXISTS toDos (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  category VARCHAR(255),
  status VARCHAR(255),
  description VARCHAR(1024)
);

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  firstname VARCHAR(255),
  lastname VARCHAR(255)
);

ALTER TABLE toDos
ADD COLUMN user_id INTEGER REFERENCES users(id);

