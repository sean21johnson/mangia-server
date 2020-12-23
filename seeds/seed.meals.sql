BEGIN;

INSERT INTO meals
    (meal_id, meal_image, meal_name, meal_category, meal_description, meal_time, users_id)
    VALUES 
    ('800', 'https://imgur.com/5H9JNVN.jpg', 'Breakfast Sandwich', 'Breakfast', 'Amazing bacon, egg and cheese with a hash brown on a roll', '11/1/2020', '1'),
    ('200', 'https://imgur.com/IywOABd.jpg', 'Buffalo Chicken Dip', 'Snack', 'Fantastic buffalo chicken dip appetizer', '11/2/2020', '1'),
    ('400', 'https://imgur.com/lrOVwgK.jpg', 'Caesar Salad', 'Lunch', 'Delicious homemade caesar salad', '11/3/2020', '1'),
    ('1232', 'https://imgur.com/RheXwZO.jpg', 'Charcuterie Board', 'Snack', 'Wonderful board of meets & cheeses', '11/4/2020', '1'),
    ('3563', 'https://imgur.com/q3v9GdH.jpg', 'Chicken Parm', 'Dinner', 'Homemade chicken parm is simply the best!', '11/5/2020', '1'),
    ('34343', 'https://imgur.com/u3ahaL7.jpg', 'Chips & Guac', 'Snack', 'Delicious chips & guace from a local Mexican restaurant', '11/6/2020', '1'),
    ('63343', 'https://imgur.com/pe7OE4K.jpg', 'Chocolate Cake', 'Dessert', 'Fantastic chocolate cake from our favorite local bakerty', '11/7/2020', '1'),
    ('6633', 'https://imgur.com/Coi7Xqz.jpg', 'Cinnamon Buns', 'Breakfast', 'Homemade cinnabon buns are as good as it gets!', '11/8/2020', '1'),
    ('664', 'https://imgur.com/Pj6De7f.jpg', 'Garlic Bread', 'Snack', 'Best garlic bread around made by yours truly!', '11/9/2020', '1'),
    ('1677', 'https://imgur.com/s2bll1e.jpg', 'Gnocchi', 'Dinner', 'Delicious gnocchi from a restaurant in Italy', '11/10/2020', '1'),
    ('7744', 'https://imgur.com/nNxXBU3.jpg', 'Greek Salad', 'Lunch', 'Great salad from a local Greek restaurant', '11/11/2020', '1'),
    ('753', 'https://imgur.com/LBWWMbD.jpg', 'Greek Gyros', 'Lunch', 'Fantastic gyros from a food truck in Manhattan', '11/12/2020', '1'),
    ('7733', 'https://imgur.com/BmE38Bx.jpg', 'Grilled Cheese', 'Lunch', 'Delicious grilled cheese with tomoto for lunch', '11/13/2020', '1'),
    ('8844', 'https://imgur.com/U52a8Uf.jpg', 'Ice Cream Sundae', 'Dessert', 'Best ice cream around from our favorite ice cream parlor', '11/14/2020', '1'),
    ('8433', 'https://imgur.com/J2h6lRo.jpg', 'Italian Sub', 'Lunch', 'Great italian cold cut sandwich from a good deli in New Jersey', '11/15/2020', '1'),
    ('9334', 'https://imgur.com/8KmSuoE.jpg', 'Lobster Roll', 'Lunch', 'Lobster roll from a seafood place in Maine', '11/16/2020', '1'),
    ('88443', 'https://imgur.com/aNN3rHi.jpg', 'New England Clam Chowder', 'Lunch', 'Best soup around from our favorite lunch spot in NYC', '11/17/2020', '1'),
    ('2235', 'https://imgur.com/Ggeo7SC.jpg', 'Pancakes', 'Breakfast', 'Pancakes from scratch are the best treat on a Saturday morning!', '11/18/2020', '1'),
    ('7393', 'https://imgur.com/ElSsrU9.jpg', 'Pizza', 'Dinner', 'Fantastic thin crust pizza from a pizzeria in New Havent, CT', '11/19/2020', '1'),
    ('30303', 'https://imgur.com/cdrRa7s.jpg', 'Spaghetti', 'Dinner', 'Hands down the best pasta spaghetti ever from a restaurant in midtown NYC', '11/20/2020', '2'),
    ('43939', 'https://imgur.com/jq0R9ix.jpg', 'Waffles', 'Breakfast', 'Fluffy waffles from my favorite local diner', '11/21/2020', '2');


COMMIT;