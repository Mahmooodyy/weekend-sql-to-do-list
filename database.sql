CREATE TABLE todo (
    "id" serial PRIMARY KEY,
    "name" varchar(80) NOT NULL,
    "description" varchar(120),
    "done"  BOOLEAN DEFAULT FALSE
);

INSERT INTO todo (name, description, done) 
VALUES ('Mow Lawn', 'Put gas in the mower make sure oil is full. start mowing.', false); 