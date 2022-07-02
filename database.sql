CREATE TABLE tasks (
    "id" serial PRIMARY KEY,
    "name" varchar(20) NOT NULL,
    "description" varchar(120),
    "done" boolean,
);

INSERT INTO todo (name, description, done) 
VALUES ('Mow Lawn', 'Put gas in the mower make sure oil is full. start mowing.', false); 