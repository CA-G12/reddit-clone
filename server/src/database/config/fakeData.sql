BEGIN;

INSERT INTO users(username, password, email, fname, lname, phone)
VALUES
('mohammed', '$2b$12$X4kv7j5ZcG39WgogSl16au6iMVSUxRYIZZ8VsRwv77.WDlSp.Wxt.', 'hi1@hi.com', 'mohammed', 'salem', '0599000000'),
('moh', 'asdfghjkl', 'hi2@hi.com', 'rami', 'salem', '0599000000'),
('muss', 'asdfghjkl', 'hi3@hi.com', 'keareen', 'salem', '0599000000'),
('mom', 'asdfghjkl', 'hi4@hi.com', 'sami', 'salem', '0599000000'),
('mobb', 'asdfghjkl', 'hi5@hi.com', 'jameel', 'salem', '0599000000'),
('mohi', 'asdfghjkl', 'hi6@hi.com', 'karam', 'salem', '0599000000'),
('moar', 'asdfghjkl', 'hi7@hi.com', 'sayed', 'salem', '0599000000');

INSERT INTO posts(title, content, user_id)
VALUES
('From fake data', 'hello, it me mustafa from post num #1', 1),
('From fake data', 'hello, it me mustafa from post num #2', 2),
('From fake data', 'hello, it me mustafa from post num #3', 3),
('From fake data', 'hello, it me mustafa from post num #4', 4),
('From fake data', 'hello, it me mustafa from post num #5', 5),
('From fake data', 'hello, it me mustafa from post num #6', 6),
('From fake data', 'hello, it me mustafa from post num #7', 7);

INSERT INTO comments(content, post_id)
VALUES
('hello, it me mustafa from comment num #1', 1),
('hello, it me mustafa from comment num #2', 2),
('hello, it me mustafa from comment num #3', 3),
('hello, it me mustafa from comment num #4', 4),
('hello, it me mustafa from comment num #5', 5),
('hello, it me mustafa from comment num #6', 5),
('hello, it me mustafa from comment num #7', 5),
('hello, it me mustafa from comment num #8', 6),
('hello, it me mustafa from comment num #9', 7);

INSERT INTO votes(kind, user_id, post_id)
VALUES
('upper', 1, 1),
('lower', 2, 2),
('upper', 3, 3),
('lower', 4, 4),
('upper', 5, 5),
('lower', 6, 6),
('upper', 7, 7);

COMMIT;
