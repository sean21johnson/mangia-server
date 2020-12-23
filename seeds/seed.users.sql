BEGIN;

INSERT INTO users
    (users_id, first_name, last_name, email, username, pass_word, date_created)
    VALUES 
    ('1', 'Sean', 'Johnson', 'seanjohnson220@gmail.com', 'sean21johnson', 'Mangia123!', '12/23/2020'),
    ('2', 'Test', 'Account', 'testaccount@gmail.com', 'testaccount', 'Mangia123!', '12/23/2020');

COMMIT;