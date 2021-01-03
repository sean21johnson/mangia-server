BEGIN;

INSERT INTO users

    (users_id, first_name, last_name, email, username, pass_word, date_created)
    VALUES 
    ('1', 'Test', 'Account', 'testaccount@gmail.com', 'testaccount', '$2a$12$anL1p0a2EDXwteEn739aaeLAlrVVN1ehd.jX1ArZbQdcRWfc7fCLO', '12/23/2020');

COMMIT;