create TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255)
);

create TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);


